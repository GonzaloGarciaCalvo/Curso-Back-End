const OrdenesFirebase = require('../../contenedores/contenedorFirebase')
/* import OrdenesFirebase from '../../contenedores/contenedorFirebase'; */
/* const firebase = require('firebase-admin')
const db = firebase.firestore();
const prod = db.collection("productos"); */

class OrdenesDaoFirebase extends OrdenesFirebase {
    constructor() {
        super('ordenes')
    }  
}
module.exports = OrdenesDaoFirebase
/* export default ProductosFirebase */