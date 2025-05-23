import { Hono } from "hono";
import { Login, Logout, Register } from "../controllers/user.controller.js"

const UserRouter = new Hono();
UserRouter.post("/register", Register).post("/login",Login).post("/logout",Logout)

export default UserRouter;
