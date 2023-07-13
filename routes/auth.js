const express=require("express");
const router=express.Router();
const User=require('../models/User')
const {validateRegister,validateLogin}=require('./validation')
const bcrypt=require('bcryptjs')

//register
router.post("/register",async(req,res)=>{
const {error}=validateRegister(req.body)
if (error) return res.status(400).send(error.details[0].message)
const emailExist=await User.findOne({email:req.body.email});

if(emailExist) return res.status(400).send('email already registered')

salt=await bcrypt.genSalt(10)
const hashed=await bcrypt.hash(req.body.password,salt)

const user=await User.create({
username:req.body.username,
email:req.body.email,
password:hashed
})

res.send({user:user._id})
})

router.post('/login',async(req,res)=>{
const {error}=validateLogin(req.body)
if (error) return res.status(400).send(error.details[0].message)
const user=await User.findOne({email:req.body.email});

if(!user) return res.status(400).send('Email not found')
const validPass=await bcrypt.compare(req.body.password,user.password)

if(!validPass) return res.status(400).send('incorecc password')
const token=jwt.sign({user:user._id},process.env.TOKEN_SECRET)



res.header('auth',token).send(token)
})







module.exports=router;
