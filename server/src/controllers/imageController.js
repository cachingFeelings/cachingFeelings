import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

export async function generateUploadURLs(req, res){
    const files = req.body.files;

    if(!files || files.length == 0){
        return res.status(400).send("Where the files at?");
    }

    const response = await Promise.all(
        files.map( async file => {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `uploads/${Date.now()}-${file.name}`,
                Expires: 60, 
                ContentType: file.type,
                ACL: 'private',
            };

            try {
                const uploadURL = await s3.getSignedUrlPromise('putObject', params);
                return { name: file.name, uploadURL, objectKey: params.Key };
              } catch (error) {
                console.error(`Error generating URL for ${file.name}:`, error);
                return { name: file.name, error: 'Failed to generate signed URL' };
              }
        })
    )

    const successfulUploads = response.filter((file) => !file.error);
    console.log(successfulUploads);
    res.status(200).json({files: successfulUploads});
}

export async function getImageURL(req, res){
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.body.fileName,
        Expires: 60*10, 
    }
    try {
        const url = s3.getSignedUrl('getObject', params);
        res.status(200).send({url : url})
    }catch (error){
        res.status(400).send({message: error.message})
    }
}

