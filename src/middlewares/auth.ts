import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserSchemaZod } from "../models/user.model";
import { fromZodError } from "zod-validation-error"
import { verify, JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  //user: string | JwtPayload;
  user: { _id: string; };
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body
  const userData = UserSchemaZod.safeParse({
    username: username,
    email: email,
    password: password
  })
  if (userData.success) {
    next()
  } else {
    res.json(fromZodError(userData.error)).status(400)
  }
}

export async function userOnly(req: Request, res: Response, next: NextFunction) {
  const token = req.header("token")
  if (!token) {
    res.json({ msg: "not authorized" }).status(400)
    return
  }
  try {
    const verifiedToken = verify(token, process.env.SECRET_KEY as string) as { _id: string };
    (req as CustomRequest).user = { _id: verifiedToken._id };
    next();
  } catch (error) {
    res.json({ msg: "unauthorized" }).status(400)
    return
  }
}
