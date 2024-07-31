import { connect } from "mongoose"

export async function dbConnect() {
  await connect(process.env.MONGO_URI as string)
  console.log("db connected");

}
