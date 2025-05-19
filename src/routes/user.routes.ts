import { Hono } from "hono";
import { Register } from "../controllers/user.controller.js";

const UserRouter = new Hono();
UserRouter.post("/register", Register);

export default UserRouter;
