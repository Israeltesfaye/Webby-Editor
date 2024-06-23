import {Router} from "express"
import {createUser,getUser,updateUser,deleteUser} from "../controllers/user.controller"

const router=Router()

router.get("/",getUser)

export default router
