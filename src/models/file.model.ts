import { Schema, Model, model } from "mongoose";
import { z } from "zod";

export const FileSchemaZod = z.object({
  title: z.string(),
  url: z.string()
})

type FileType = z.infer<typeof FileSchemaZod>;
type FileModel = Model<FileType>

export const FileSchema: Schema = new Schema<FileType, FileModel>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }

})


export const File = model("File", FileSchema)
