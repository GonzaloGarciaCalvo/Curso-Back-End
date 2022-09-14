const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

const firebase = require('firebase-admin')
const db = firebase.firestore();
const prod = db.collection("productos");

class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super(prod)
    }  
}
module.exports = ProductosFirebase