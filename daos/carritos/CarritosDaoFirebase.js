const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

/* const firebase = require('firebase-admin')
const db = firebase.firestore();
const cart = db.collection("carritos"); */

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(cart)
    }  
}
module.exports = CarritoDaoFirebase