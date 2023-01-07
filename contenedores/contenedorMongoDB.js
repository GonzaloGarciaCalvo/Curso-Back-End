
/* const mongoDB = require('../config') */
/* const mongoDB = require('../configDB/mongoDB') */
const mongoose =require('mongoose') 
/* import mongoDB from '../config' */



class ContenedorMongoDB {
    constructor(modelo) {
    
        this.modelo = modelo
        this.connection()
    }
    connection = async () => {
        // try {
        //     /* console.log('modelo en ContenedorMongoDB', this.modelo()) */
        //     const url = 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test'
        //     await mongoose.connect(url,{
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     })
        //     console.log('MongoDB en connection contenedorMongoDB')
        // } catch (error) {
        //     console.error(error)
        // }

        (async () => {
					try {
						/* console.log('modelo en ContenedorMongoDB', this.modelo()) */
						const url =
							"mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test";
						await mongoose.connect(url, {
							useNewUrlParser: true,
							useUnifiedTopology: true,
						});
						console.log("MongoDB en connection contenedorMongoDB");
					} catch (error) {
						console.error(error);
					}
				})();

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
            const getAll = await this.modelo.find()
            return getAll
        } catch (error) {
            return console.log(error)
        }
    }

    async getById(id) {
        try {
            const getById = await this.modelo.findOne({ _id: id })
            return getById
        } catch (error) {
            console.log(error)
        }
    }

    async update(item, id) {
        try {  
            console.log("id en update mongo ", id)  
            console.log("item en update mongo ", item)  
            const update = await this.modelo.findOneAndUpdate(id ,item )
            return update
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById (id) {
        try {
            const eliminado = await this.modelo.deleteOne({ _id: id });
            return eliminado
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ContenedorMongoDB
