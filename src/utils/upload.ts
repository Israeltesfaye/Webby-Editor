import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json"))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.BUCKET_NAME
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
