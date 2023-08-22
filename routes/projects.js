const express=require("express");
const File=require("../models/File.js")
const Project=require("../models/Project.js")
const User=require('../models/User.js')
const auth=require('./authMiddleware.js')
const ObjectId = require('mongodb').ObjectId;
const router=express.Router()


router.post("/",auth,async(req,res)=>{
try{
const project=await Project.create({
title:req.body.title,
html:Buffer.from("<h1>hello</h1>"),
css:Buffer.from("h1{color:red}"),
script:Buffer.from("nothing in here"),
author:req.user.user
})
res.status(200).json({"msg":"project created"})
}catch(err){
res.status(400).json(err)
}
})

router.get("/",auth,async(req,res)=>{
const projects=await Project.find({author:req.user.user})
const result=[]
projects.forEach((p)=>{result.push({title:p.title,
id:p._id
})})
res.status(200).json(result)
})


router.get("/file:id/:type",auth,async(req,res)=>{
const projects=await Project.find({author:req.user.user})
const params=req.params.id.replace(":","")
const type=req.params.type.replace(":","")
const result=[];
projects.forEach((p)=>{
if(p._id.valueOf()==params){result.push(p)}
})
if(type=="html"){
res.status(200).json(result[0].html.toString())
}
if(type=="css"){
res.status(200).json(result[0].css.toString())
}
if(type=="script"){
res.status(200).json(result[0].script.toString())
}
})

router.put("/:id/:type",auth,async(req,res)=>{
const params=req.params.id.replace(":","")
const type=req.params.type.replace(":","")
if(type=="html"){
const projects=await Project.findByIdAndUpdate(params, { html:Buffer.from(req.body.data) })
}
if(type=="css"){
const projects=await Project.findByIdAndUpdate(params, { css:Buffer.from(req.body.data) })
}
if(type=="script"){
const projects=await Project.findByIdAndUpdate(params, { script:Buffer.from(req.body.data) })
}
res.status(200)
})

router.delete("/:id",auth,async(req,res)=>{
const params=req.params.id.replace(":","")
try{
const projects=await Project.findByIdAndDelete(params)
res.status(200).json({"msg":"project deleted"})}
catch(err){
res.status(200).json({"msg":"error occured"})
}
})

module.exports=router;
