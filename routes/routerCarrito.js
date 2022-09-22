const express = require('express');
/* import express from 'express' */
const { Router } = express;

/* const CarritoFirebase = require('../../daos/carritos/CarritosDaoFirebase') */
const dao = require('../daos') // reemplaza CarritoFirebase
const cart = dao.carritosDao
const prod = dao.productosDao
/* const cart = carritosDao.productosDao */


const routerCarrito = new Router();  // routerCarrito
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));


//getall
routerCarrito.get('/', async (req, res) => {
  try {
    const getAll = await cart.getAll()
    res.json(getAll)
	} catch (error) {
		console.log(error)
	}

})

//getbyId
routerCarrito.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const getById = await cart.getById(id)
    res.json(getById)
})


// POST crea 1 carrito
routerCarrito.post("/", (req, res) => {
	let timestamp = Date.now();

	cart.save({ timestamp, productos: [] }).then((data) => {
		res.json({
			id: data,
		});
	});
});

// Delete borra 1 carrito completo
routerCarrito.delete("/:id", (req, res) => {
	const { id } = req.params;

	//Carritos.borrarPorId(parseInt(id))
	cart.borrarPorId(id).then((data) => {
		res.json({ delete: id });
	});
});

// GET lista de productos de 1 carrito
routerCarrito.get("/:id/productos", (req, res) => {
	const { id } = req.params;
	cart.ListarProductosPorId(id).then((data) => {
		res.json(data);
	});
});

// POST guardar 1 producto en 1 carrito
routerCarrito.post("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const { id_prod } = req.body;
console.log("routerCarrito // id :",id," id_prod :", id_prod)
	let productoData = await prod.getById(id_prod)
	console.log("productoData ",productoData)// producto con id
		cart.guardarProducto(id,id_prod, productoData).then((data) => {
			res.json(data);
		});
	;
});

// DELETE borra 1 producto de 1 carrito
routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
	const { id, id_prod } = req.params;

	cart.borrarProductoPorId(id, id_prod).then((data) => {
		res.json(data);
	});
});

module.exports = routerCarrito