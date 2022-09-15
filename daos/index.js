
let productosDao;
let carritosDao;
let selector;

switch (selector) {
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

  export {productosDao, carritosDao}
