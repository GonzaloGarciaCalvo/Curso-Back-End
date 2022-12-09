
const prod = require('../api/productos')

const saveController = async (req, res) => {
  const {nombre, categoria, precio, thumbnail, stock} = req.body
  const item = {
      nombre:nombre,
      categoria:categoria,
      precio:precio,
      thumbnail:thumbnail,
      stock:stock,
      timestamp: Date.now()
  }
  const insertar = await prod.save(item);
  res.json(insertar)
}

const getAllcontroller = async (req, res) => {

  const getAll = await prod.getAll()
  res.json(getAll)

}

const getByIdController = async (req, res) => {
  const id = req.params.id;
  const getById = await prod.getById(id)
  res.json(getById)
}

const updateController = async (req, res) => {
  const id = req.params.id;
  const numberId = Number(id) || id
  console.log("numberId en routerProductos Update ",numberId)
  const {nombre, categoria, precio, thumbnail, stock, timestamp} = req.body
  const item = {
      nombre:nombre,
      categoria:categoria,
      precio:precio,
      thumbnail:thumbnail,
      stock:stock,
      id:numberId,
      timestamp: Date.now()
  }
  console.log("numberId", numberId)
  console.log("item en routerProductos ", item)
  const insertar = await prod.update(item, numberId);
  res.json(insertar)
}

const deletecontroller = async (req, res) => {

  const id= req.params.id
  const eliminar = await prod.deleteById(id);
  res.json(eliminar)

}

module.exports = {
  saveController, 
  getAllcontroller, 
  getByIdController, 
  updateController,
  deletecontroller
}