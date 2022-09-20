/* import CarritoDaoFirebase from './carritos/CarritosDaoFirebase';
import CarritosDaoMongo from './carritos/CarritosDaoMongo';
import ProductosFirebase from './productos/ProductosDaoFirebase';
import ProductosDaoMongo from './productos/ProductosDaoMongo'; */
const CarritoDaoFirebase = require('./carritos/CarritosDaoFirebase')
const CarritosDaoMongo = require('./carritos/CarritosDaoMongo')
const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo')
const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
const ProductosDaoMongo = require('./productos/ProductosDaoMongo')
const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')


let productosDao;
let carritosDao;
let selector;
selector = 'mongoDB'
/* selector = 'firebase' */
/* selector = 'archivo' */

/* switch (selector) {
  case 'firebase':
    const { default: ProductosDaoFirebase} = await import('../contenedores/contenedorFirebase')
    productosDao = new ProductosDaoFirebase()
    const { default: CarritosDaoFirebase} = await import('../contenedores/contenedorFirebase')
    carritosDao = new CarritosDaoFirebase()
  break;

  case 'mongoDB':
    const {default: ProductosDaoMongo} = await import('../contenedores/contenedorMongoDB')
    productosDao = new ProductosDaoMongo()
    const {default: CarritosDaoMongo} = await import('../contenedores/contenedorMongoDB')
    carritosDao = new CarritosDaoMongo()
    break;
  }
  export {productosDao, carritosDao} */
  switch (selector) {

    case 'firebase': {
      productosDao = new ProductosDaoFirebase()    
      carritosDao = new CarritoDaoFirebase()
    }
    break;
    
    case 'mongoDB':{
    productosDao = new ProductosDaoMongo()
    carritosDao = new CarritosDaoMongo()
    }
    break;

    case 'archivo':{
      productosDao = new ProductosDaoArchivo()
      carritosDao = new CarritosDaoArchivo()
    }
    }

    module.exports = {productosDao, carritosDao} 
