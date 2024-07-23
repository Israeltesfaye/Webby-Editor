import { Router } from "express"
import { createProjects, getProject, getProjects } from "../controllers/projects.controller"

const router = Router()

router.get("/projects", getProjects)
  .get("/project", getProject).post("/project", createProjects)

export default router
