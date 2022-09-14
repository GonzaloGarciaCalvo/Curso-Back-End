const ContenedorMongoDB = require("../../contenedores/contenedorMongodb");

const {productos} = require('../../schemas/schemas')


class ProductosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos)
    }
}
module.exports = ProductosDaoMongo