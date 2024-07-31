import { Schema, Model, model } from "mongoose";
import { z } from "zod";
import { FileSchema } from "./file.model";

export const ProjectSchemaZod = z.object({
  firebaseId: z.string(),
  title: z.string(),
  description: z.string(),
  private: z.boolean(),
  template: z.enum(["HTML/CSS/JS", "REACT JS"]),
  files: z.array(z.object({
    title: z.string(),
    url: z.string()
  }))
})

type ProjectType = z.infer<typeof ProjectSchemaZod>;
type ProjectModel = Model<ProjectType>

const ProjectSchema: Schema = new Schema<ProjectType, ProjectModel>({
  firebaseId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  private: {
    type: Boolean,
    required: true
  },
  files: [FileSchema],
  template: {
    type: String,
    enum: ["HTML/CSS/JS", "REACT JS"],
    required: true,
  }
})


export const Project = model("Project", ProjectSchema)
