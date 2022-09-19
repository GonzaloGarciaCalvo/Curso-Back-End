
const mongoDB = require('../config')
const mongoose =require('mongoose') // faltaba importar mongoose
/* import mongoDB from '../config' */



class ContenedorMongoDB {
    constructor(modelo) {
    /* constructor(ruta, modelo) { */
        /* this.ruta = ruta */ // va a ser url
        this.modelo = modelo
        this.connection()
    }
    connection = async () => {
        try {
            console.log('modelo en ContenedorMongoDB', this.modelo())// undefined
            const url = 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test'
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log('MongoDB en connection contenedorMongoDB')
        } catch (error) {
            console.error(error)
        }
    }

    async save(item) {
        try {
            const result = await new this.modelo(item).save()
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const getAll = await this.modelo().find()
            return getAll
        } catch (error) {
            return console.log(error)
        }
    }

    async getById(id) {
        try {
            const getById = await this.modelo().findOne({ _id: id })
            return getById
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(id, item) {
        try {    
            const update = await this.modelo().findOneAndUpdate(id ,item )
            return update
        } catch (error) {
            console.log(error)
        }
    }

    async eliminar(id) {
        try {
            const eliminado = await this.modelo().deleteOne({ _id: id });
            return eliminado
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ContenedorMongoDB
