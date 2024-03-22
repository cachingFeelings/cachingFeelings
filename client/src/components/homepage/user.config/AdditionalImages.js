import React, { useState, useEffect } from 'react';
import './userconfig'
import './userconfig.css'

const serverURL = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

function AdditionalImages() { 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatuses, setUploadStatuses] = useState({});
    const [uploaded, setUploaded] = useState(false);
    const [imageURLs, setImageURLs] = useState([]);
    const [currentUserName, setCurrentUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${serverURL}:${serverPort}/api/user/getCurrentUserId`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                    },
                });
          
                if (!response.ok) {
                    throw new Error(`ERROR: http status: ${response.status}`);
                }
          
                const data = await response.json();
                const userId = data._id;

                const res = await fetch(`${serverURL}:${serverPort}/api/user/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        '_id': userId
                    }),
                });

                const userData = await res.json();

                if (userData && userData.userObj.pictures && userData.userObj.pictures.length > 0) {
                    setCurrentUserName(userData.userObj.username);
                    const userPictures = userData.userObj.pictures;
                    const imageURLs = await Promise.all(userPictures.map(async (mediaKey) => {
                    const mediaRes = await fetch(`${serverURL}:${serverPort}/api/images/getImageURL`, {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json',
                        },
                      body: JSON.stringify({ fileName: mediaKey })
                    });
                    const mediaData = await mediaRes.json();
                    return mediaData.url; 
                  }));
                  setImageURLs(imageURLs.filter(url => url !== null));
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const previews = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setImagePreviews(previews);
    }

    const uploadFiles = async () => {
        if (!selectedFiles.length) return;

        const fileInfo = selectedFiles.map(file =>(
            {
                name: file.name,
                type: file.type
            }
        ));

        try {
            const response = await fetch(`${serverURL}:${serverPort}/api/images/generateUploadUrls`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({files: fileInfo}),
            });
            const data = await response.json();

            const updatedFilesWithKeys = [...selectedFiles];


            await Promise.all(data.files.map(async (file, index) => {
                const { uploadURL, objectKey } = file;
                await fetch(uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFiles[index].type,
                    },
                    body: selectedFiles[index],
                });

                updatedFilesWithKeys[index] = {
                    ...updatedFilesWithKeys[index],
                    objectKey: objectKey,
                };

                setUploadStatuses(prev => ({ ...prev, [file.name]: 'Uploaded'}));
            }))
            return updatedFilesWithKeys; 

        } catch (error){
            console.error('Upload error:', error);
        }
    }

    function handleUploadClick(event){
        event.preventDefault();
        uploadFiles();
        setUploaded(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const token = localStorage.getItem('token');
    
            const payload = {
                pictures: []
            };

            const uploadedFiles = selectedFiles.length > 0 ? await uploadFiles() : [];

            if(uploadedFiles){
                const fileKeys = uploadedFiles.map(file => file.objectKey).filter(key => key !== undefined);
    
                if(fileKeys.length > 0){
                    payload.pictures = fileKeys;
                }
    
                const res = await fetch(`${serverURL}:${serverPort}/api/user/uploadImages`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(payload),
                });

                if (res.ok) {
                    alert("Profile picture updated successfully!");
                } else {
                    alert("Failed to update your profile picture :(");
                }
                window.location.reload();
            }
        } catch (err) {
            console.error("Error submitting message:", err);
            alert("Something went wrong :(");
        }
    };

    const content = (
        <div className='settings-picture-container'>
                <div className='current-settings-preview-container'>
                {imageURLs.length > 0 ? (
                    imageURLs.map((url, index) => (
                        <div key={index} className="current-media-link" style={{ display: 'flex', alignItems: 'center' }}>
                            <img className='current-profile-picture' src={url} alt={`Current Media Preview ${index}`} />
                            <h1 className='current-user-name' style={{color:"white", marginLeft: '10px'}}>{currentUserName}</h1>
                        </div>
                    ))
                ) : (
                    <h1 className='current-user-name' style={{color:"white"}}>{currentUserName}</h1>
                )}
        </div>
            <input type="file" multiple onChange={handleFileChange} />
            <p style={{color:"white"}}>After choose new picture, click on upload first, then click on save</p>
            <div className='settings-preview-container'>
                {imagePreviews.map((preview, index) => (
                    <div className='profile-picture-container' key={index}>
                        <button className='upload-image-button' onClick={handleUploadClick}>{uploadStatuses[preview.name] || 'Upload Image'}</button>
                        <img className='profile-picture' src={preview.url} alt={preview.name} />
                    </div>
                ))}
            </div>
            <button className='save-new-image-button' style={{display: uploaded ? 'inline-block' : 'none'}} onClick={handleSubmit}>Update Profile Picture</button>
        </div>
    );
    return content;
}

export default AdditionalImages;