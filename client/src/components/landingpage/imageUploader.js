import React, { useState } from 'react';
// import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

const serverURL = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

function ImageUploadComponent(){ 
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatuses, setUploadStatuses] = useState({});
    
    const { handleChange } = useSignUpContext()

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
                console.log(objectKey);
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

                const fileKeys = updatedFilesWithKeys.map(file => file.objectKey).filter(key => key !== undefined);
                console.log(`The filekeys are: ${fileKeys}`); 

                handleChange({
                    target: {
                        name: 'pictures',
                        value: fileKeys
                    }
                })

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
        <div style={{textAlign:"center"}}>
            <input type="file" multiple onChange={handleFileChange} />
            <div style={{display:"flex", justifyContent:"center"}}>
                {imagePreviews.map((preview, index) => (
                    <div key={index}>
                        <img src={preview.url} alt={preview.name} style={{ width: 100, height: 100 }} />
                        <p>{uploadStatuses[preview.name] || 'Pending'}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleUploadClick}>Upload Images</button>
        </div>

    );
    return content;
}

export default ImageUploadComponent;
