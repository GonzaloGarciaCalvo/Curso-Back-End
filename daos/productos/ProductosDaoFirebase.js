const ContenedorFirebase = require('../../contenedores/contenedorFirebase')
/* import ContenedorFirebase from '../../contenedores/contenedorFirebase'; */
/* const firebase = require('firebase-admin')
const db = firebase.firestore();
const prod = db.collection("productos"); */

class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super('productos')
    }  
}
module.exports = ProductosFirebase
/* export default ProductosFirebase */