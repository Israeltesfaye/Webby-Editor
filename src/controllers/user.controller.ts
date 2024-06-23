import {Request,Response} from "express-serve-static-core"

export function getUser(req:Request,res:Response){
console.log({user:"fakeuser"})
}

export function createUser(req:Request,res:Response){
console.log({user:"fakeuser"})
}

export function updateUser(req:Request,res:Response){
console.log({user:"fakeuser"})
}

export function deleteUser(req:Request,res:Response){
console.log({user:"fakeuser"})
}
