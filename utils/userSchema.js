const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true}
})
const User = model('usuarios',userSchema)
module.exports = User

/* const userSchema = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    age:{type:Number, required:true},
    address:{type:String, required:true}
}) */