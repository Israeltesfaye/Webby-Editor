import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { File } from "../models/file.model";
import { createFiles } from "../utils/files";
import { User, UserSchema } from "../models/user.model";
import { CustomRequest } from "../middlewares/auth";
import { Document } from "mongoose"
import { v4 as uuidv4 } from 'uuid';

export async function getProjects(req: Request, res: Response) {
  try {
    const user = await User.findOne({ _id: (req as CustomRequest).user?._id })

    if (user) {
      res.json(user.projects).status(200);
    }
  } catch (error) {
    res.json({ "msg": "something wrong happend" }).status(400)
  }
}

export async function createProjects(req: Request, res: Response) {
  const { title, description, template } = req.body
  try {

    const firebaseId = uuidv4()
    const files = await createFiles(template, (req as CustomRequest).user?._id, firebaseId)
    const project = await Project.create({
      firebaseId: firebaseId,
      title: title,
      description: description,
      template: template,
      private: false,
      files: files
    })
    const user = await User.findOne({ _id: (req as CustomRequest).user?._id })
    if (user) {
      await User.findOneAndUpdate({ _id: (req as CustomRequest).user?._id }, { projects: [...user.projects, project] })
      res.json({ "msg": "project has been created", "data": project })
    }
  } catch (error) {
    res.json({ "msg": "something wrong happend" })
  }
}

interface DatabaseProject extends Document {
  title: string;
  template: string;
  description: string;
  private: boolean;
  files: any[];
}
export async function getProject(req: Request, res: Response) {
  //TODO select the user first
  try {
    const project = await Project.findOne({ _id: req.params.id })
    res.json(project).status(200)
  }
  catch (error) {
    res.json({ "msg": "something went wrong" })
  }
}

export async function deleteProject(req: Request, res: Response) {
  //TODO select the user first
  try {
    const project = await Project.deleteOne({ _id: req.params.id })
    const user = await User.findOne({ _id: (req as CustomRequest).user?._id })
    if (user) {
      await User.findOneAndUpdate({ _id: (req as CustomRequest).user?._id }, { $pull: { projects: req.params.id } })
      res.json({ "msg": "deleted succesfully" }).status(200)
    }
  } catch (error) {
    res.json({ "msg": "something went wrong" }).status(400)
  }
}
