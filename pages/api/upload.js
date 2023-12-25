import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'; // AWS S3 Bucket
import fs from 'fs'; // To read file
import mime from 'mime-types' // To read file engine
const bucketName = 'the-fit-club';

export default async function handle(req, res) {
    await isAdminRequest(req, res);
    
    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        });
    });
    console.log('Length: ', files.file.length);
    // Create storage to start storing data
    const client = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const links = []

    for (const file of files.file) {
        // Create unique filename
        const ext = file.originalFilename.split('.').pop() // test.MOV => .MOV
        const newFilename = Date.now() + '.' + ext;
        console.log({ext, file});
        // Đưa data vào bucket
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path), // Ex: To read file.path 'C:\\Users\\Owner\\AppData\\Local\\Temp\\RRecWYL41KYdVY4O7JVyDQkb.MOV'
            ACL: 'public-read',
            ContentType: mime.lookup(file.path) // Define file format
        }));
        // Create a link for the public file
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    return res.json({links});
}

export const config = {
    api: {bodyParser: false},
}