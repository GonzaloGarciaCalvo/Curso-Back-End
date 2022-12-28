const express = require('express');
/* import express from 'express' */
const { Router } = express;

const {
  getCartsController,
  getCartByIdController,
  createCartcontroller,
  deleteCartController,
  saveProdInCart,
  deleteProdFromCart
} = require('../controllers/controller-carritos')

/* const dao = require('../daos') 
const cart = dao.carritosDao
const prod = dao.productosDao */
/* const cart = require('../api/carritos')

const prod = require('../api/productos') */


const routerCarrito = new Router();  // routerCarrito
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));



//getall
routerCarrito.get('/', 
  getCartsController
/* async (req, res) => {
  try {
    const getAll = await cart.getAll()
		console.log("getAll ", getAll)
    res.json(getAll)
	} catch (error) {
		console.log("error mostrado en router", error)
	}

} */)



// POST crea 1 carrito
routerCarrito.post("/",
createCartcontroller
 /* (req, res) => {
	let timestamp = Date.now();
	cart.save({ timestamp, productos: [] })
	.then((data) => {
		console.log("data._id en router", data._id)
		res.send(
			data._id,
		);
	})
} */);

// Delete borra 1 carrito completo
routerCarrito.delete("/:id", deleteCartController/* (req, res) => {
	const { id } = req.params;

	//Carritos.borrarPorId(parseInt(id))
	cart.borrarPorId(id).then((data) => {
		res.json({ delete: id });
	});
} */);


//getbyId
/* routerCarrito.get("/:id/productos", async (req, res) => {
	const id = req.params.id;
	const getById = await cart.getById(id)
	res.json(getById)
}) */



// GET lista de productos de 1 carrito   // lo tomo como getById
routerCarrito.get("/:id/productos", getCartByIdController/* (req, res) => {
	const { id } = req.params;
	cart.ListarProductosPorId(id).then((data) => {
		res.json(data);
	});
} */);

// POST guardar 1 producto en 1 carrito
routerCarrito.post("/:id/productos", saveProdInCart
/* async (req, res) => {
	const { id } = req.params;
	const { id_prod } = req.body;
console.log("routerCarrito // id :",id," id_prod :", id_prod)
	let productoData = await prod.getById(id_prod)
	console.log("productoData ",productoData)// producto con id
		cart.guardarProducto(id,id_prod, productoData).then((data) => {
			res.json(data);
		});
	;
} */);

// DELETE borra 1 producto de 1 carrito
routerCarrito.delete("/:id/productos/:id_prod", 
deleteProdFromCart
/* (req, res) => {
	const { id, id_prod } = req.params;

	cart.borrarProductoPorId(id, id_prod).then((data) => {
		res.json(data);
	});
} */);

module.exports = routerCarrito