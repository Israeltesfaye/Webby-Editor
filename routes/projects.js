const express=require("express");


const router=express.Router()


router.get("/:id",(req,res)=>{

res.send(`${req.param('project')}`)
})




module.exports=router;
