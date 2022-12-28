const cart = require('../api/carritos')

const prod = require('../api/productos')

const getCartsController =  async (req, res) => {
  try {
    const getAll = await cart.getAll()
		console.log("getAll ", getAll)
    res.json(getAll)
	} catch (error) {
		console.log("error mostrado en router", error)
	}

}

/* const getByIdController = async (req, res) => {
  const id = req.params.id;
  const getById = await cart.getById(id)
  res.json(getById)
} */

const getCartByIdController = (req, res) => {
	const { id } = req.params;
	cart.ListarProductosPorId(id).then((data) => {
		res.json(data);
	});
}


const createCartcontroller = (req, res) => {
	let timestamp = Date.now();
	cart.save({ timestamp, productos: [] })
	.then((data) => {
		console.log("data._id en router", data._id)
		res.send(
			data._id,
		);
	})
}

const deleteCartController = (req, res) => {
	const { id } = req.params;
	cart.borrarPorId(id).then((data) => {
		res.json({ delete: id });
	});
}

const saveProdInCart = async (req, res) => {
	const { id } = req.params;
	const { id_prod } = req.body;
console.log("routerCarrito // id :",id," id_prod :", id_prod)
	let productoData = await prod.getById(id_prod)
	console.log("productoData ",productoData)// producto con id
		cart.guardarProducto(id,id_prod, productoData).then((data) => {
			res.json(data);
		});
	;
}

const deleteProdFromCart = (req, res) => {
	const { id, id_prod } = req.params;
	cart.borrarProductoPorId(id, id_prod).then((data) => {
		res.json(data);
	});
}

module.exports = {
  getCartsController,
  getCartByIdController,
  createCartcontroller,
  deleteCartController,
  saveProdInCart,
  deleteProdFromCart
}