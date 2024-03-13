import React, { useState } from 'react';
import './userconfig'

function AdditionalImages(){ 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatuses, setUploadStatuses] = useState({});

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
            const response = await fetch("http://localhost:8080/api/images/generateUploadUrls", {
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
    
                const res = await fetch("http://localhost:8080/api/user/uploadImages", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                console.log(data); 
                setImagePreviews([]);
                setSelectedFiles([]);
        }
        } catch (err) {
            console.error("Error submitting message:", err);
        }
    };

    const content = (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUploadClick}>Upload Images</button>
            <div>
                {imagePreviews.map((preview, index) => (
                    <div key={index}>
                        <img src={preview.url} alt={preview.name} style={{ width: 100, height: 100 }} />
                        <p>{uploadStatuses[preview.name] || 'Pending'}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Save new images</button>
        </div>

    );
    return content;
}

export default AdditionalImages;