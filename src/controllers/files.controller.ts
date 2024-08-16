import { Request, Response } from "express"
import { File } from "../models/file.model"
import { uploadBuffer, getFileContent } from "../utils/upload"
import { CustomRequest } from "../middlewares/auth";
import { Project } from "../models/project.model";

export async function updateFile(req: Request, res: Response) {
  try {
    const { fileId, projectId } = req.params
    const file = await File.findOne({ _id: fileId })
    const project = await Project.findOne({ _id: projectId })
    const content = Buffer.from(req.body.content)
    console.log(content)
    await uploadBuffer(content, `${(req as CustomRequest).user._id}/${project?.firebaseId}/${file?.title}`)
    //await File.findOneAndUpdate({ _id: fileId }, { url: url })
    res.json({ "msg": "updated file" })
  } catch (error) {
    console.log(error)
    res.json({ "msg": "something wrong happend" }).status(400)
  }
}

export async function getFile(req: Request, res: Response) {
  const { projectId, filename } = req.params
  try {
    const content = await getFileContent(`${(req as CustomRequest).user._id}/${projectId}/${filename}`)
    res.json({ "data": content }).status(200)
  } catch (error) {
    console.log(error)
    res.json({ "msg": error }).status(400)
  }
}
