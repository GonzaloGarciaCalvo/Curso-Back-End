const ContenedorMongoDB = require("../../contenedores/contenedorMongodb");
/* import ContenedorMongoDB from '../../contenedores/contenedorMongoDB' */
/* const {productos} = require('../../schemas/schemas') */
const mongoose =require('mongoose') 
const { Schema } = mongoose;

const prodSchema = new Schema({
    nombre: { type: String, required:true },
    categoria:{ type: String, required:true },
    precio: { type: Number, required:true },
    thumbnail:{ type: String, required:true },
    stock: { type: Number, required:true },
},{timestamps: true}) 
const productos = mongoose.model('productos', prodSchema)


class ProductosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos)
    }
}
module.exports = ProductosDaoMongo
/* export default ProductosDaoMongo */