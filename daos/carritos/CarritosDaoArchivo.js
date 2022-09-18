const ContenedorFirebase = require('../../contenedores/claseContenedor')


class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }  
}
module.exports = CarritoDaoFirebase