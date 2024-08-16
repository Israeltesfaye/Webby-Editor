import *  as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import UserRoute from "./routes/user.router"
import ProjectsRouter from "./routes/projects.router"
import FilesRouter from "./routes/files.router"

import { dbConnect } from "./utils/db"

const app = express()
const port = process.env.PORT || 8000

dbConnect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/user", UserRoute)
app.use("/api/projects", ProjectsRouter)
app.use("/api/files", FilesRouter)


app.listen(port, () => { console.log(`Server is runing on port ${port}`) })
