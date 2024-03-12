import React, { useState } from 'react';
import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

function ImageUploadComponent(){ 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatuses, setUploadStatuses] = useState({});
    
    const { data, handleChange } = useSignUpContext()

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

            await Promise.all(data.files.map(async (file, index) => {
                const { uploadURL, objectKey } = file;
                await fetch(uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFiles[index].type,
                    },
                    body: selectedFiles[index],
                });
                setUploadStatuses(prev => ({ ...prev, [file.name]: 'Uploaded'}));
            }))

        } catch (error){
            console.error('Upload error:', error);
        }
    }

    function handleUploadClick(event){
        event.preventDefault();
        uploadFiles();
    }

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
        </div>

    );
    return content;
}

export default ImageUploadComponent;
