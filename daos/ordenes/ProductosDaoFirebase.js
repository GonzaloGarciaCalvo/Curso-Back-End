const OrdenesFirebase = require('../../contenedores/contenedorFirebase')
/* import OrdenesFirebase from '../../contenedores/contenedorFirebase'; */
/* const firebase = require('firebase-admin')
const db = firebase.firestore();
const prod = db.collection("productos"); */

class OrdenesFirebase extends OrdenesFirebase {
    constructor() {
        super('ordenes')
    }  
}
module.exports = OrdenesFirebase
/* export default ProductosFirebase */