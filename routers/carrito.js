const express = require('express');
const { Router } = express;
const Contenedor = require('../claseContenedor');

const administrador = true
const carrito = new Contenedor('./carritos.txt');
/* const productos = new Contenedor(prods) */
const routerCarrito = new Router();

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }))

//Routes

//POST a) crear carrito
routerCarrito.post('/', async (req, res) => {
        const item = req.body;  
        const carroAgregado = carrito.saveCart(item)
        const resultado = await carroAgregado
        console.log("post/ ") // server responde not found
        /* res.json(resultado.id) */
})
// b) Incorporar productos al carrito
routerCarrito.post('/:id/productos', async (req, res) => {
    const id = req.params.id
    const cart = await carrito.getById(id)
    const item = await productos.getById(req.body.id)
    cart.productos.push(item);
    console.log(cart.productos)
    const resultado = await carrito.updateItem(cart, id)    
    res.json(resultado)
})

//GET ARRAY CARRO
routerCarrito.get('/', async (req, res) => {
    const array = carrito.getAll();
    const resultado = await array;
    res.json(resultado)
})

// GET PRODS DEL CARRITO, por id de cart
routerCarrito.get('/:id/productos', async (req, res) => {
    const cartId = req.params.id
    console.log("cartId", cartId) // bien
    const cart = carrito.getById(cartId);
    const resultado = await cart
    console.log("resultado cart  ",resultado) // 
    const productsInCart = resultado.productos

    res.json(productsInCart)
})

// b) vaciar carrito
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


// e) DELETE  eliminar prod del cart
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.id_prod;
    console.log("cartId: ",cartId)
    console.log("prodId: ",prodId)
    const resultado = await carrito.deletProd(cartId, prodId)
    res.json(resultado)
})

module.exports = routerCarrito