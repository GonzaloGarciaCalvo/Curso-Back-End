const express = require('express')
const routerCarrito = require('./routes/routerCarrito')
const routerProductos = require('./routes/routerProductos')

 
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//MongoDB
/* const {connection} = require('./config')
connection() */

//Firebase
/* const {dbFirebase} = require('./config')
dbFirebase() */

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)



const PORT = 8080
/* const server = httpServer.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message)); */

app.listen(PORT, () => {
    console.log(`Servidor Online puerto ${PORT}`)
})