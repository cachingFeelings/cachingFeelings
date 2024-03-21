import React, { useState } from 'react';
import './userconfig'
import './userconfig.css'

const serverURL = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

function AdditionalImages(){ 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatuses, setUploadStatuses] = useState({});
    const [uploaded, setUploaded] = useState(false);

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
            }
        } catch (err) {
            console.error("Error submitting message:", err);
            alert("Something went wrong :(");
        }
    };

    const content = (
        <div className='settings-picture-container'>
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