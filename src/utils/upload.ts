import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccountKey = JSON.parse(process.env.SERVICE_ACCOUNT as string);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
  storageBucket:'gs://webby-editor.appspot.com' 
});


const bucket = admin.storage().bucket();

export async function uploadFile(filePath: string, destinationPath: string) {

  try {
    const [file] = await bucket.upload(filePath, {
      destination: destinationPath,

    });
    return {
      url: file.publicUrl(),
      title: file.name,
    }

  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Function to upload a buffer
export async function uploadBuffer(buffer: Buffer, destinationPath: string) {
  try {
    const file = bucket.file(destinationPath);


    const stream = file.createWriteStream();


    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('Error uploading buffer:', err);
        reject(err);
      });

      stream.on('finish', async () => {

        await file.makePublic();
        resolve({
          url: file.publicUrl(),
          //title: file.name,
        });
      });
      stream.end(buffer);
    });
  } catch (error) {
    console.error('Error uploading buffer:', error);
  }
}

export async function getFileContent(filePath: string): Promise<string> {
  try {
    const file = bucket.file(filePath);
    const stream = file.createReadStream();


    return new Promise((resolve, reject) => {
      let content = '';
      stream.on('data', (chunk) => {
        content += chunk.toString();
      });
      stream.on('end', () => {
        resolve(content);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error fetching file content:", error);
    throw error;
  }
}
