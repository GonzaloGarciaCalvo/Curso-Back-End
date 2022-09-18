const express = require('express')
/* import express from 'express' */
const routerCarrito = require('./routes/routerCarrito')
const routerProductos = require('./routes/routerProductos')
/* import routerCarrito from './routes/routerCarrito.js' */
/* import routerProductos from './routes/routerProductos.js' */
 
const app = express()


//MongoDB
/* const {connection} = require('./config')
connection() */

//Firebase
/* const {dbFirebase} = require('./config')
dbFirebase() */



//Routes 
/* import routerCarrito from './routes/routerCarrito'
import routerProductos from './routes/routerProductos' */
/* const routerCart = routerCarrito() */
/* const routerProductos = require("./routes/routerProductos") */
/* const routerCarrito = require('./routes/routerCarrito') */

app.use('api/productos', routerProductos)
app.use('api/carritos', routerCarrito)



const PORT = 8080
/* const server = httpServer.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message)); */

app.listen(PORT, () => {
    console.log(`Servidor Online puerto ${PORT}`)
})