const express = require('express');
/* import express from 'express' */
const { Router } = express;

/* const CarritoFirebase = require('../../daos/carritos/CarritosDaoFirebase') */
const carritosDao = require('../daos') // reemplaza CarritoFirebase
const cart = carritosDao.carritosDao
/* import { carritosDao } from '../daos'; */

const routerCarrito = new Router();  // routerCarrito
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));

/* const cart = new CarritoFirebase */
/* const cart = new carritosDao */
console.log('carritosDao',  carritosDao)/* llega:
carritosDao {
            productosDao: ProductosDaoMongo { mongoDB: [AsyncFunction: connectDB] },
            carritosDao: CarritosDaoMongo { mongoDB: [AsyncFunction: connectDB] }
  } */

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

//Insert
routerCarrito.post('/', async (req, res) => {

    
    const item = req.body
        
    const insertar = await cart.insert(item);
    res.json(insertar)

})

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

/* export default routerCarrito */
module.exports = routerCarrito