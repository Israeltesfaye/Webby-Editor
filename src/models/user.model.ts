import { Schema, Model, model } from "mongoose";
import { z } from "zod";

export const UserSchemaZod = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  projects: z.array(z.any()).optional()
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
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }]
})


export const User = model("User", UserSchema)
