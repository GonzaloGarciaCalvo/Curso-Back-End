const ContenedorFirebase = require('../../contenedores/contenedorFirebase')
/* import { carritosDao } from ".."
import ContenedorFirebase from "../../contenedores/contenedorFirebase" */

const firebase = require('firebase-admin')
const db = firebase.firestore();
const cart = db.collection("carritos");

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(cart)
    }  
}
module.exports = CarritoDaoFirebase
/* export default CarritoDaoFirebase */