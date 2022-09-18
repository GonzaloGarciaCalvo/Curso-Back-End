const ContenedorFirebase = require('../../contenedores/claseContenedor')


class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super('productos')
    }  
}
module.exports = ProductosFirebase