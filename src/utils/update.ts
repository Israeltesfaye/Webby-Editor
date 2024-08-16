import { Project } from "../models/project.model";

export async function updateField(pId: string, field: string, value: string | boolean) {
  switch (field) {
    case "title":
      const title = await Project.updateOne({ _id: pId }, { $set: { title: value } })
      console.log(title)
      break;
    case "description":
      await Project.updateOne({ _id: pId }, { $set: { description: value } })
      break;
    case "private":
      await Project.updateOne({ _id: pId }, { $set: { private: value } })
      break;
    case "template":
      await Project.updateOne({ _id: pId }, { $set: { template: value } })
      break;
  }
}
