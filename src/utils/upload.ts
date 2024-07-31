import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config()

const serviceAccount = JSON.parse(process.env.serviceAccount as string)

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
