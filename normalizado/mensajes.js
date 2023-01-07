const connection = require("../db/mongo");
const mongoose = require('mongoose')
const  normalizar = require("./normalizr");
// try {    // conflicto con concexion del  DAOS
//     connection()
//     /* console.log("Conectado a MongoDB") */
// } catch (error) {
//     console.log(error)
// }

// const mongooseSchema = new mongoose.Schema({
//     author: {
//         id: { type: String, required: true, max: 100 },
//         nombre: { type: String, required: true, max: 100 },
//         apellido: { type: String, required: true, max: 50 },
//         edad: { type: Number, required: true },
//         alias: { type: String, required: true },
//         avatar: { type: String, required: true, max: 100 },
//         timestamp: { type: Date, default: Date.now }
//     },
//     text: { type: String, required: true, max: 400 }
// });

/* const mongooseSchema = new mongoose.Schema({
  author: {
      id: { type: String, required: true, max: 100 },
      timestamp: { type: Date, default: Date.now }
  },
  text: { type: String, required: true, max: 400 }
}); */

const mensajesSchema = new mongoose.Schema({
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  texto: { type: String, required: true, max: 400 },
});

const msjModel = mongoose.model('mensajes2', mensajesSchema); // mensajes2 para que no rompa 

const save = async (msj) => {
    const newMsj = msjModel(msj)
    try {
        newMsj.save()
    } catch (error) {
        console.log(error)
        
    }
}

const verMsj = async () => {
    const getAll = await msjModel.find()
    /* const normalizado = normalizar(getAll) */
    /* console.log("normalizado en verMesj ", normalizado) */
    /* return normalizado */
    return getAll

}
module.exports = {
    verMsj,
    save,
}