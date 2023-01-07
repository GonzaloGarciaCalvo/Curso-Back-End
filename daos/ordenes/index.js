const OrdenesDaoFirebase = require('./OrdenesDaoFirebase')
const OrdenesDaoMongo = require('./OrdenesDaoMongo')
const OrdenesDaoArchivo = require('./OrdenesDaoArchivo')


let ordenesDao;
let selector;
selector = 'mongoDB'
/* selector = 'firebase' */
/* selector = 'archivo' */


  switch (selector) {

    case 'firebase': {
      ordenesDao = new OrdenesDaoFirebase()    
    }
    break;
    
    case 'mongoDB':{
    ordenesDao = new OrdenesDaoMongo()
    }
    break;

    case 'archivo':{
      ordenesDao = new OrdenesDaoArchivo()
    }
    }

    const getOrdenesDao = ordenesDao


    module.exports = getOrdenesDao

    