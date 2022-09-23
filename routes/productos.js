const {faker} = require("@faker-js/faker")
const express = require("express");
const {Router} = express
const productos= Router()
productos.get('/api/productos-test',  async (req, res)=> {
    try {
        const productos = []
        for (let i=0; i<6; i++) {
            const _producto = {
                nombre: faker.commerce.productName(),
                precio: faker.commerce.price(),
                imagen: faker.image.cats() 
            }
            productos.push(_producto)
        }
        res.json(productos) 
    } catch (error) {
        console.log("error ", error)
    }
}) 

    


module.exports =  productos