const ProductosDaoFirebase = require('./ProductosDaoFirebase')
const ProductosDaoMongo = require('./ProductosDaoMongo')
const ProductosDaoArchivo = require('./ProductosDaoArchivo')


let productosDao;
let selector;
selector = 'mongoDB'
/* selector = 'firebase' */
/* selector = 'archivo' */


  switch (selector) {

    case 'firebase': {
      productosDao = new ProductosDaoFirebase()    
    }
    break;
    
    case 'mongoDB':{
    productosDao = new ProductosDaoMongo()
    }
    break;

    case 'archivo':{
      productosDao = new ProductosDaoArchivo()
    }
    }

    const getProductosDao = productosDao


    module.exports = getProductosDao