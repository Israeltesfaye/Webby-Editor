import { connect } from "mongoose"

export async function dbConnect() {
  await connect("mongodb://10.55.193.75:27017" as string)
  console.log("db connected");

}
