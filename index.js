require('dotenv').config()
const cors=require("cors")
const express=require("express");
const mongoose=require("mongoose");
const projects=require("./routes/projects.js");
const userRoute=require("./routes/auth.js")

const app=express();
const port=process.env.PORT || 8080;


app.use(express.static("./public"))
app.use(express.json());
app.use(cors())

async function connect(){
await mongoose.connect(process.env.MONGO_URL).then(console.log("db connected"))
}

connect().then(()=>{

app.use("/projects",projects)
app.use("/api/user",userRoute)
})



app.listen(port,()=>console.log("Server is runing"))
