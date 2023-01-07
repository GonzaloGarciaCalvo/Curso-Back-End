const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB");
const mongoose =require('mongoose') 
const { Schema } = mongoose;

const ordenSchema = new Schema({
	email: { type: String, required: true},
	estado: { type: Boolean, default: true },
	productos: [
		{
			nombre: { type: String, required: true },
			precio: { type: Number, required: true },
			cantidad: { type: Number, required: true },
		},
	],
	direccion: { type: String, required: true },
	ciudad: { type: String, required: true },
	total: { type: Number, required: true },
	numero: { type: Number, required: true },
	timestamp: { type: Date, default: Date.now },
});

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
            const order = await this.modelo.find({ email: email })
            return order
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = OrdenesDaoMongo