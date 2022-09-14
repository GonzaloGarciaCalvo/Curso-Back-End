const ContenedorMongoDB = require("../../contenedores/contenedorMongodb");

const {carritos} = require('../../schemas/schemas')

class CarritosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(carritos)
    }  
}
module.exports = CarritosDaoMongo