const ContenedorFirebase = require('../../contenedores/claseContenedor')


class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super('productos', '../..productos.txt')
    }  
}
module.exports = ProductosFirebase