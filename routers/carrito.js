const express = require('express');
const { Router } = express;
const Contenedor = require('../claseContenedor');

const administrador = true
const carrito = new Contenedor('./carritos.txt');
const contenidoArchivo = new Contenedor('./productos.txt');
/* const productos = new Contenedor(prods) */
const routerCarrito = new Router();

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }))

//Routes

//a) crear carrito
routerCarrito.post('/', async (req, res) => {
        const item = req.body;  
        const carroAgregado = carrito.saveCart(item)
        const resultado = await carroAgregado
        console.log("post/ ") // server responde not found
        /* res.json(resultado.id) */
})

//GET muestra cart   esto no lo piden
/* routerCarrito.get('/', async (req, res) => {
    const array = carrito.getAll();
    const resultado = await array;
    res.json(resultado)
}) */


// b) vaciar carrito  // falta eliminar carrito
routerCarrito.delete('/:id', async(req, res)=>{ 
    if (administrador) {
        const id = req.params.id
        const numberId = Number(id) 
        const resultadoDelete = await contenidoArchivo.deleteById(numberId) 
        res.json({
            result:"eliminado",
            id:id
        }) 
    } else res.send('ruta no autorizada')
})

// c) lista prod del cart, por id de cart   FALTA PROBAR CUANDO FUNCIONE EL AGREGAR PRUDUCTOS d)
routerCarrito.get('/:id/productos', async (req, res) => {
    const cartId = req.params.id
    console.log("cartId", cartId) // bien
    const cart = carrito.getById(cartId);
    const resultado = await cart
    console.log("resultado cart  ",resultado) 
    const productsInCart = resultado.productos
    res.json(productsInCart)
})

// d) Incorporar productos al carrito por id de producto
// CONSULTAR: 
routerCarrito.post('/:id/productos', async (req, res) => {
    const id = req.params.id
    /* const cart = await carrito.getById(id) */
    const prod = await contenidoArchivo.getById(id)
    /* const item = await carrito.getById(req.body.id) */ // COMO SE LINKEA 
    carrito.push(prod);
    console.log(cart.carrito)
    const resultado = await carrito.updateItem(cart, id)    
    res.json(resultado)
})

// e) eliminar prod del cart    PENDIENTE DE PRUEBA
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.id_prod;
    console.log("cartId: ",cartId)
    console.log("prodId: ",prodId)
    const resultado = await carrito.deletProd(cartId, prodId)
    res.json(resultado)
})

module.exports = routerCarrito