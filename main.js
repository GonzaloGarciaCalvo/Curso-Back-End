const express = require('express')
const fs = require("fs")
const Contenedor = require("./claseContenedor");
const contenidoArchivo = new Contenedor('./productos.txt');

/* contenedor.save({ nombre: 'Remera Azul', categoria: 'remera', precio: 4500, thumbnail:"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" }) */
/* contenedor.save({ nombre: 'Remera Azul y blanca', categoria: 'remera', precio: 4500, thumbnail:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" })
contenedor.save({ nombre: 'Remera Blanca', categoria: 'remera', precio: 4100, thumbnail:"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg" })
 */

const app = express()
/* let productos = function (products) {`<h2>Lista de productos</h2>
                ${products.map((prod) =><h3>{prod}</h3>)}`} */

const getProducts = contenidoArchivo.getAll() 
contenidoArchivo.getById(3)

app.get('/', async(req,res)=>{
    const resultado = await getProducts
    res.send(`<h1 color="blue">Bien venidos al servicos Experess</h1>` )
})
// app.get('/productos', (req,res)=>{
//   /* const products = contenedor.getAll() */
//     /* res.send(`<h2>Lista de productos</h2>
//     ${products.map((prod) =><h3>{prod}</h3>)}`) */
// })

// app.get('/productoRandom', (req,res)=>{
//     const fyh = new Date()
//     res.send(`FyH: ${ fyh.getDate() }/${ fyh.getMonth() }/${ fyh.getFullYear() }  ${ fyh.getHours() }:${ fyh.getMinutes() }:${ fyh.getSeconds() }`)
// })


const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
})