// const express = require('express')
// const app = express()
// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')  
// const moment = require('moment-timezone');

// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

// const Contenedor = require('./claseContenedor')
// const ContenedorSqlite = require('./contenedorSqlite')


// /* const knex = require('knex')(options) */
// const { mariaDB } = require('./configDB/config')
// const { sqlite3 } = require('./configDB/configSqlite')
// const knex_mariaDB = require('knex')(mariaDB) 
// const knex_sqlite = require('knex')(sqlite3)  
// const productsCollection = new Contenedor(knex_mariaDB, "productos", "ruta")
// const messegesCollection = new ContenedorSqlite(knex_sqlite, "mensajes", "ruta2")

// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// //Advertencia NODE body-parser deprecated undefined extended: provide extended option server.js:14:17

// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.post('/productos', async (req,res) =>{
//   const dataForm = req.body
//   await productsCollection.save(dataForm)
//  res.redirect('/')
// })

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html")
// })


// //Configuracion del socket
// io.on('connection', async (socket) => {

//   const getProducts =await productsCollection.getAll()
//   socket.emit('productos-guardados', getProducts); 
  
//   // actualizacion de productos
//   socket.on('add-product', async (producto) => {  
//     await productsCollection.save(producto)
//     const getProducts =await productsCollection.getAll()
//       io.sockets.emit('productos-guardados', getProducts);
//   }) 


//   //Chat
//   const resultado = await messegesCollection.getMesseges()
//   /* console.log("resultado",resultado) */
//   socket.emit('MENSAJES_GUARDADOS', resultado );
//   socket.on('chat_message', async (msg) => {
//       let date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss')
//       msj = { ...msg, date: date }
//       await messegesCollection.saveMessage(msj) 
//       console.log("mensaje en soket:", msj) //llega
//       io.sockets.emit('new_message', msj)
//   })
// });


// const PORT = 8080
// const server = httpServer.listen(PORT || 8080, () => {
//     console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
// }).on('error', (e) => console.log('Error: ', e.message));

/* mongodb+srv://garciacalvog:<password>@cluster0.qju9tzm.mongodb.net/?retryWrites=true&w=majority */

const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");


const moment = require('moment-timezone');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const productos= require('./routes/productos')

const {save, verMsj} = require("./controllers/mensajes")
app.use('/', productos)
  

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html")
})


io.on('connection', async (socket) => {
    console.log('conectado al servidor io')
    socket.on("chat_message", (msj)=> {
        save(msj)
        io.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024
    console.log(getAllPesoOriginal)

    io.sockets.emit('MENSAJES_EXISTENTES', getAll)
    io.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})


httpServer.listen(PORT, () => {
    console.log(`Servidor online puerto ${PORT}`)
})