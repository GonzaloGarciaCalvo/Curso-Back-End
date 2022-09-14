
const mongoDB = require('../config')



class ContenedorMongoDB {
    constructor() {
        this.mongoDB = mongoDB
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
            const result = await item.save()
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
