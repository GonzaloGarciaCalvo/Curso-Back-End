/* const ContenedorMongoDB = require("../../contenedores/contenedorMongodb"); */
import ContenedorMongoDB from '../../contenedores/contenedorMongoDB'
const {productos} = require('../../schemas/schemas')


class ProductosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos)
    }
}
/* module.exports = ProductosDaoMongo */
export default ProductosDaoMongo