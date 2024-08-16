import { Router } from "express"
import { getFile, updateFile } from "../controllers/files.controller"
import { userOnly } from "../middlewares/auth";
import { viewProject } from "../controllers/projects.controller";

const router = Router()

router.put("/:fileId/:projectId", userOnly, updateFile).get("/:projectId/:filename", userOnly, getFile)

export default router
