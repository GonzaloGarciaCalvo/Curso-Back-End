const ContenedorFirebase = require('../../contenedores/claseContenedor')


class OrdenesFirebase extends ContenedorFirebase {
    constructor() {
        super('ordenes.txt')
    }  
}
module.exports = OrdenesFirebase