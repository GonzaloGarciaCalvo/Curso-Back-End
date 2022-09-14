const express = require('express');
const { Router } = express;

const productosDao = require('../daos/productos')

const routerProductos = new Router();
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

const prod = new productosDao

//Getall
routerProductos.get('/', async (req, res) => {

    const getAll = await prod.getAll()
    res.json(getAll)

})

//GetbyId
routerProductos.get("/:id", async (req, res) => {
    const id = req.params.id;
    const getById = await prod.getById(id)
    res.json(getById)
})

//Insert
routerProductos.post('/', async (req, res) => {

    const {nombre, precio} = req.body
    const item = {
        nombre:nombre,
        precio:precio
    }
    const insertar = await prod.insert(item);
    res.json(insertar)

})

//Update
routerProductos.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {nombre, precio} = req.body
    const item = {
        nombre:nombre,
        precio:precio
    }
    const insertar = await prod.actualizar(id, item);
    res.json(insertar)
})

//Delete
routerProductos.delete('/:id', async (req, res) => {

    const id= req.params.id
    const eliminar = await prod.eliminar(id);
    res.json(eliminar)

})

module.exports = routerProductos