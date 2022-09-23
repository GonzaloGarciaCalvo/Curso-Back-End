const {faker} = require("@faker-js/faker")
const express = require("express");
const {Router} = express
const productos= Router()
productos.get('/api/product-test', (req, res)=> {
    const productos = []
    for (let i=0; i<n; i++) {
        const _producto = {
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.cats() 
        }
        productos.push(_producto)
    }
    res.json(productos) 
}) 

    


module.exports =  productos