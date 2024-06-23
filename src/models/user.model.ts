import { Schema, Model, model } from "mongoose";
import { z } from "zod";

const UserSchemaZod = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  projects: z.array(z.object({
    title: z.string().min(5),
    private: z.boolean().default(true),
    template: z.enum(["HTML/CSS/JS", "REACT JS"])
  })).optional()
})

type UserType = z.infer<typeof UserSchemaZod>;
type UserModel = Model<UserType>

const UserSchema: Schema = new Schema<UserType, UserModel>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
})

console.log(UserSchemaZod.parse({
  username: "kiya",
  email: "email@gmail.com",
  password: "12345678",
  projects: [{
    title: "My first Project",
    private: false,
    template: "REACT JS"
  }]
}))

export const User = model("User", UserSchema)
