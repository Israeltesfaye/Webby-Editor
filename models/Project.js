mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	  title:{
	  type:String,
	  min:6,
	  max:12},
	  author:{
           type:mongoose.Schema.ObjectId,
           ref:"User"
	  },
	  html:{type:Buffer},
	css:{type:Buffer},
	script:{type:Buffer}
	  });

model=mongoose.model('Project', ProjectSchema);

module.exports=model;
