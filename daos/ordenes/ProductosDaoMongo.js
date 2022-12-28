const ContenedorMongoDB = require("../../contenedores/contenedorMongodb");

const mongoose =require('mongoose') 
const { Schema } = mongoose;

const ordenSchema = new Schema({
    nombre: { type: String, required:true },
    categoria:{ type: String, required:true },
    precio: { type: Number, required:true },
    thumbnail:{ type: String, required:true },
    stock: { type: Number, required:true },
},{timestamps: true}) 
const ordenes = mongoose.model('ordenes', ordenSchema)


class OrdenesDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(ordenes)
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

    async getByEmail(email) {
        try {
            const order = await this.modelo.findOne({ email: email })
            return order
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = OrdenesDaoMongo