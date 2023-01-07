const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB");
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
        super(productos);
    //     ( async () => {
	// 		try {
	// 				/* console.log('modelo en ContenedorMongoDB', this.modelo()) */
	// 				const url = 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test'
	// 				await mongoose.connect(url,{
	// 						useNewUrlParser: true,
	// 						useUnifiedTopology: true,
	// 				})
	// 				console.log('MongoDB en connection contenedorMongoDB')
	// 		} catch (error) {
	// 				console.error(error)
	// 		}
	// } )()
    }
}
module.exports = ProductosDaoMongo
/* export default ProductosDaoMongo */