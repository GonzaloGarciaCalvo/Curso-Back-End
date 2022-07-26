const express = require('express')
const fs = require("fs")
const Contenedor = require("./claseContenedor");
const contenidoArchivo = new Contenedor('./productos.txt');

/* contenedor.save({ nombre: 'Remera Azul', categoria: 'remera', precio: 4500, thumbnail:"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" }) */
/* contenedor.save({ nombre: 'Remera Azul y blanca', categoria: 'remera', precio: 4500, thumbnail:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" })
contenedor.save({ nombre: 'Remera Blanca', categoria: 'remera', precio: 4100, thumbnail:"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg" })
 */

const app = express()

const getProducts = contenidoArchivo.getAll() 
contenidoArchivo.getById(3)

app.get('/', async(req,res)=>{
    const resultado = await getProducts
    res.send(resultado)
})

app.get("/productoRandom", async (req, res) => {
    const resultado = await getProducts;
    const productoAleatorio= resultado[Math.floor(Math.random() * resultado.length)];
    res.send(productoAleatorio) 
})


const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
})