import { Router } from "express"
import { createProjects, deleteProject, getProject, getProjects, updateProject, viewProject } from "../controllers/projects.controller"
import { userOnly } from "../middlewares/auth"

const router = Router()

router.get("/projects", userOnly, getProjects)
  .get("/project/:id", userOnly, getProject).post("/project", userOnly, createProjects).delete("/project/:id", userOnly, deleteProject).put("/project/:id/:field", userOnly, updateProject).get("/view/:uid/:fid", viewProject)

export default router
