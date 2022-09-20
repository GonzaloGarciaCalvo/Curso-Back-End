const ContenedorMongoDB = require("../../contenedores/contenedorMongodb");
/* import ContenedorMongoDB from '../../contenedores/contenedorMongoDB' */
/* const {carritos} = require('../../schemas/schemas') */
/* const {Schema} = require('mongoose'); */
const mongoose =require('mongoose') 
const { Schema } = mongoose;

const carritoSchema= new Schema({
    productos: {type: Object}
},{timestamps: true}) 
const carritos = mongoose.model('carrito', carritoSchema)


class CarritosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(carritos)
    }  
}
module.exports = CarritosDaoMongo
/* export default CarritosDaoMongo */