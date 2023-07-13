mongoose=require("mongoose")
p=require("./Project.js")
user=require("./User.js")
ff=require('./File.js')
f=require("fs")

file=Buffer.from(f.readFileSync('./User.js'))
async function foo(){
await mongoose.connect("mongodb+srv://israeltesfaye:GTZkLbA5Jv76Pyj0@cluster0.mx6yegu.mongodb.net/?retryWrites=true&w=majority").then(console.log("db connected"))
fuf=await ff.findOne({title:"kiya.jsx"})

console.log(fuf)
f.writeFileSync('saved',fuf.Data)
}

foo()
