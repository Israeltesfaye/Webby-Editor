const express=require("express");
const router=express.Router();
const User=require('../models/User')
const {validateRegister,validateLogin}=require('./validation')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//register
router.post("/register",async(req,res)=>{
const {error}=validateRegister(req.body)
if (error) return res.status(400).json(error.details[0].message)
const emailExist=await User.findOne({email:req.body.email});

if(emailExist) return res.status(400).json('email already registered')

salt=await bcrypt.genSalt(10)
const hashed=await bcrypt.hash(req.body.password,salt)

const user=await User.create({
username:req.body.username,
email:req.body.email,
password:hashed
})

res.json({user:user._id})
})

router.post('/login',async(req,res)=>{
const {error}=validateLogin(req.body)
if (error) return res.status(400).json(error.details[0].message)
const user=await User.findOne({email:req.body.email});

if(!user) return res.status(400).json('Email not found')
const validPass=await bcrypt.compare(req.body.password,user.password)

if(!validPass) return res.status(400).json('incorecct password')
const token=jwt.sign({user:user._id},process.env.TOKEN_SECRET)



res.status(200).header('auth',token).json(token)
})







module.exports=router;
