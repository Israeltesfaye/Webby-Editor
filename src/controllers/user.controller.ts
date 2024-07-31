import { Request, Response } from "express"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { User } from "../models/user.model"

export async function Login(req: Request, res: Response) {
  const { email, password } = req.body
  const validEmail = await User.findOne({ email: email })
  if (!validEmail) return res.json({ msg: "email not found" }).status(400)
  const validPass = await bcrypt.compare(password, validEmail.password)
  if (!validPass) return res.json({ msg: "incorrect password" }).status(400)
  const token = jwt.sign({ _id: validEmail._id, email: validEmail.email }, process.env.SECRET_KEY as string)
  res.json({ token: token }).status(200)

}

export async function Register(req: Request, res: Response) {
  const { username, email, password } = req.body
  let emailExist = await User.findOne({ email: email })
  if (emailExist) {
    res.json({ msg: "email already exist" }).status(400)
    return;
  }
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)


    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    })
    const savedUser = await user.save()
    const token = jwt.sign({ _id: savedUser._id, email: savedUser.email }, process.env.SECRET_KEY as string)
    res.json({ token: token }).status(200)
  } catch (error) {
    res.json({ msg: "something wrong happend" }).status(400)
  }
}

