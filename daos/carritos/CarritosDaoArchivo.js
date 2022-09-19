const ContenedorFirebase = require('../../contenedores/claseContenedor')


class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos.txt') //  con ../../carritos.txt rompe
    }  
}
module.exports = CarritoDaoFirebase