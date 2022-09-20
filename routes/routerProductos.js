const express = require('express');
/* import express from 'express' */
const { Router } = express;

const dao = require('../daos')
const prod = dao.productosDao

const routerProductos = new Router();
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

//Save
routerProductos.post('/', async (req, res) => {
    const {nombre, categoria, precio, thumbnail} = req.body
    const item = {
        nombre:nombre,
        categoria:categoria,
        precio:precio,
        thumbnail:thumbnail,
    }
    const insertar = await prod.save(item);
    res.json(insertar)
})

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


//Update
routerProductos.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {nombre, precio} = req.body
    const item = {
        nombre:nombre,
        precio:precio
    }
    const insertar = await prod.update(id, item);
    res.json(insertar)
})

//Delete
routerProductos.delete('/:id', async (req, res) => {

    const id= req.params.id
    const eliminar = await prod.deleteById(id);
    res.json(eliminar)

})

/* export default routerProductos */
module.exports = routerProductos