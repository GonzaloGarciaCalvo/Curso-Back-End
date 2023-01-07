/* const MensajesDaoFirebase = require('./mensajes/MensajesDaoFirebase') */
const MensajesDaoMongo = require('./MensajesDaoMongo')
/* const MensajesDaoArchivo = require('./mensajes/MensajesDaoArchivo') */

let mensajesDao;
let selector;
selector = 'mongoDB'
/* selector = 'firebase' */
/* selector = 'archivo' */

  switch (selector) {

   /*  case 'firebase': {
      mensajesDao = new OrdenesDaoFirebase()
    }
    break; */
    
    case 'mongoDB':{
    mensajesDao = new MensajesDaoMongo()
    }
    break;

    /* case 'archivo':{
      mensajesDao = new OrdenesDaoArchivo()
    } */
    }

    const getOrdenesDao = mensajesDao
    module.exports = getOrdenesDao