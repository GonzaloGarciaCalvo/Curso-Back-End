const express = require('express');
/* import express from 'express' */
const { Router } = express;

/* const CarritoFirebase = require('../../daos/carritos/CarritosDaoFirebase') */
const dao = require('../daos') // reemplaza CarritoFirebase
const cart = dao.carritosDao
/* const cart = carritosDao.productosDao */


const routerCarrito = new Router();  // routerCarrito
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));

/* const cart = new CarritoFirebase */
/* const cart = new carritosDao */
 console.log('carritosDao en routercarrito', cart)// llega:

 //Insert
routerCarrito.post('/', async (req, res) => {
    const item = req.body
    let timestamp = Date.now();
    const insertar = await cart.save({ timestamp, productos: [] });
    res.json(insertar)
})
/* app.post("/api/carrito", (req, res) => {
    let timestamp = Date.now();
  
    Carritos.guardar({ timestamp, productos: [] }).then((data) => {
      res.json({
        id: data,
      });
    });
  }); */
//Getall
routerCarrito.get('/', async (req, res) => {

    const getAll = await cart.getAll()
    res.json(getAll)

})

//GetbyId
routerCarrito.get("/:id", async (req, res) => {
    const id = req.params.id;
    const getById = await cart.getById(id)
    res.json(getById)
})


/* routerCarrito.post('/', async (req, res) => {
    const item = req.body;  
    const carroAgregado = carrito.save(item)
    const resultado = await carroAgregado
    console.log("post/ ") // server responde not found
    res.json(resultado.id)
}) */

//Update
routerCarrito.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body
    const item = {
        nombre: nombre,
        precio: precio
    }
    const insertar = await cart.actualizar(id, item);
    res.json(insertar)
})

//Delete
routerCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id
    const eliminar = await cart.eliminar(id);
    res.json(eliminar)

})

module.exports = routerCarrito