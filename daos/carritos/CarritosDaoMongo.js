/* const ContenedorMongoDB = require("../../contenedores/contenedorMongodb"); */
import ContenedorMongoDB from '../../contenedores/contenedorMongoDB'
const {carritos} = require('../../schemas/schemas')

class CarritosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(carritos)
    }  
}
/* module.exports = CarritosDaoMongo */
export default CarritosDaoMongo