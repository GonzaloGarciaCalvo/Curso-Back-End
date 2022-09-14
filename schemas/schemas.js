const {Schema, model} = require('mongoose');


const prodSchema = new Schema({
    nombre: {type: String, required:true},
    descripcion:{type: String, required:true},
    foto:{type: String, required:true},
    precio: {type: Number, required:true},
    codigo: {type: Number, required:true},
    stock: {type: Number, required:true},
    
},{timestamps: true}) 

const carritoSchema= new Schema({
    productos: {type: Object}
    
},{timestamps: true}) 
const productos = model('productos', prodSchema)
const carritos = model('carrito', carritoSchema)
module.exports = {
    productos,
    prodSchema,
    carritos, 
    carritoSchema
}