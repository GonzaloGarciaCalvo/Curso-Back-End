const express = require('express');
/* import express from 'express' */
const { Router } = express;

/* const dao = require('../daos')
const prod = dao.productosDao */
const prod = require('../api/productos')

const routerProductos = new Router();
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

const {
    saveController, 
  getAllcontroller, 
  getByIdController, 
  updateController,
  deletecontroller
} = require('../controllers/productos')

//Save
/* routerProductos.post('/', async (req, res) => {
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
}) */

routerProductos.post('/', saveController)

/* const prodSchema = new Schema({
    nombre: { type: String, required:true },
    categoria:{ type: String, required:true },
    precio: { type: Number, required:true },
    thumbnail:{ type: String, required:true },
    stock: { type: Number, required:true },
},{timestamps: true})  */

//Getall
routerProductos.get('/', 
    getAllcontroller

/* async (req, res) => {

    const getAll = await prod.getAll()
    res.json(getAll)

} */)



//GetbyId
routerProductos.get("/:id", 
    getByIdController
/* async (req, res) => {
    const id = req.params.id;
    const getById = await prod.getById(id)
    res.json(getById)
} */)


//Update
routerProductos.put('/:id',
    updateController
/* async (req, res) => {
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
} */)

//Delete
routerProductos.delete('/:id',
    deletecontroller
 /* async (req, res) => {

    const id= req.params.id
    const eliminar = await prod.deleteById(id);
    res.json(eliminar)

} */)

/* export default routerProductos */
module.exports = routerProductos