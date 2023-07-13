const joi=require('joi');

const validateRegister=(req)=>{
schema=joi.object({
username:joi.string().min(6).required(),
password:joi.string().min(8).required(),
email:joi.string().min(6).required().email()
})

const message=schema.validate(req)
return message
}


const validateLogin=(req)=>{
schema=joi.object({
password:joi.string().min(8).required(),
email:joi.string().min(6).required().email()
})

const message=schema.validate(req)
return message
}


module.exports={
	validateRegister,
	validateLogin
};
