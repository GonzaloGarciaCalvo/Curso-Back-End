/* import { getCarritosDao } from '../daos/productos/index.js' */

/* const daos = require('../daos')
const carritosApi = daos.getCarritosDao
console.log( "carritosApi", carritosApi) */
const carritosApi = require('../daos/carritos')
console.log( "carritosApi", carritosApi) 

module.exports= carritosApi