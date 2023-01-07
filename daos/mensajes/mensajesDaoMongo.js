const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB')
const mongoose =require('mongoose') 
const { Schema } = mongoose;

/* const {Mensajes} = require('../utils/schemas/schemas') */
const mensajesSchema = new Schema({
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  texto: { type: String, required: true, max: 400 },
});
const mensajes = mongoose.model("mensajes", mensajesSchema);

class MensajesDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(mensajes)
    }
}
module.exports= MensajesDaoMongo