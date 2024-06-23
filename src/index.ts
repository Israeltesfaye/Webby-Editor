import *  as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import UserRoute from "./routes/user.router"
import { dbConnect } from "./utils/db"

const app = express()
const port = process.env.PORT || 8000
console.log(process.env.MONGO_URI)
dbConnect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/user", UserRoute)




app.listen(port, () => { console.log(`Server is runing on port ${port}`) })
