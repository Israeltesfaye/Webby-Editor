require('dotenv').config()
const express=require("express");
const mongoose=require("mongoose");
const projects=require("./routes/projects.js");
const userRoute=require("./routes/auth.js")

const app=express();
const port=process.env.PORT || 8080;


app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("db connected"))



app.use("/projects",projects)
app.use("/api/user",userRoute)




app.listen(port,()=>console.log("Server is runing"))
