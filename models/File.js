const mongoose=require("mongoose")

const FileSchema=new mongoose.Schema({
title:{
type:String,
max:12},
Data:{
type:Buffer
}})


model=mongoose.model("File",FileSchema)
module.exports=model
