const ContenedorFirebase = require('../../contenedores/claseContenedor')


class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos', '../../carritos.txt')
    }  
}
module.exports = CarritoDaoFirebase