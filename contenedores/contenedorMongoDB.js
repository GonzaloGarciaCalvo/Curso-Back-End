
const mongoDB = require('../config')
/* import mongoDB from '../config' */



class ContenedorMongoDB {
    constructor() {
        this.ruta = ruta
        this.modelo = model
        this.connection()
    }
    connection = async () => {
        try {
            const url = 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test'
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log('MongoDB connected')
        } catch (error) {
            console.error(error)
        }
    }
    async getAll() {
        try {
            const getAll = await this.url.find()
            return getAll
        } catch (error) {
            return console.log(error)
        }
    }

    async getById(id) {
        try {
            const getById = await this.url.findOne({ _id: id })
            return getById
        } catch (error) {
            console.log(error)
        }
    }

    async insertar(item) {
        try {
            const result = await new this.modelo(item).save()
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(id, item) {
        try {    
            const update = await this.url.findOneAndUpdate(id ,item )
            return update
        } catch (error) {
            console.log(error)
        }
    }

    async eliminar(id) {
        try {
            const eliminado = await this.mongoDB.deleteOne({ _id: id });
            return eliminado
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ContenedorMongoDB
