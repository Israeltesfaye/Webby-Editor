const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	  username:{
	  type:String,
	  min:6,
	  max:16
	  },
	  email:{
	  type:String,
	  max:25},
	  password:{
	  type:String,
	  min:8,
	  max:100},
	  projects:{
       type:[mongoose.Schema.ObjectId],
      ref:"Project",
      default:[]
	  }})
model=mongoose.model('User', UserSchema)

module.exports = model;
