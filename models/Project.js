mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	  title:{
	  type:String,
	  min:6,
	  max:12},
	  type:{
	  type:String},
	  author:{
           type:mongoose.Schema.ObjectId,
           ref:"User"
	  },
	  files:[mongoose.Schema.ObjectId]
});

model=mongoose.model('Project', ProjectSchema);

module.exports=model;
