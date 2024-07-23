import { Router } from "express"
import { Register, Login } from "../controllers/user.controller"
import { userOnly, validateUser } from "../middlewares/auth";

const router = Router()

router.post("/register", validateUser, Register)
  .post("/login", validateUser, Login)

export default router
