import { File } from "../models/file.model";
import templates from "./templates/constants";
import { Document } from "mongoose"
import { uploadFile } from "./upload";
import * as path from "path";
interface DatabaseFile extends Document {
  title: string;
  url: string;
}

export async function createFiles(template: string, userId: string, firebaseProjectId: string) {

  const filePromises = templates.filter(t => t.name === template)[0].files.map(async (f) => {
    const filePath = `./src/utils/templates/html_css_js/${f.filename}`;
    const downloadURL = await uploadFile(filePath, `${userId}/${firebaseProjectId}/${f.filename}`);
    return await File.create({
      title: f.filename,
      url: downloadURL?.url
    });
  });


  const files = await Promise.all(filePromises);
  return files;
}
