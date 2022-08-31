const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')  
const app = express()
const moment = require('moment-timezone');

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./claseContenedor')
const ContenedorSqlite = require('./contenedorSqlite')


/* const knex = require('knex')(options) */
const { mariaDB } = require('./configDB/config')
const { sqlite3 } = require('./configDB/configSqlite')
const knex_mariaDB = require('knex')(mariaDB) 
const knex_sqlite = require('knex')(sqlite3)  
const productsCollection = new Contenedor(knex_mariaDB, "productos", "ruta")
const messegesCollection = new ContenedorSqlite(knex_sqlite, "mensajes", "ruta2")

app.use(express.urlencoded({extends:true}));
app.use(express.json());
//Advertencia NODE body-parser deprecated undefined extended: provide extended option server.js:14:17
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

app.post('/productos', async (req,res) =>{
  const dataForm = req.body
  await productsCollection.save(dataForm)
 res.redirect('/')
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})


//Configuracion del socket
io.on('connection', async (socket) => {

  const getProducts =await productsCollection.getAll()
  socket.emit('productos-guardados', getProducts); 
  
  // actualizacion de productos
  socket.on('add-product', async (producto) => {  
    await productsCollection.save(producto)
    const getProducts =await productsCollection.getAll()
      io.sockets.emit('productos-guardados', getProducts);
  }) 


  //Chat
  const resultado = await messegesCollection.getMesseges()
  /* console.log("resultado",resultado) */
  socket.emit('MENSAJES_GUARDADOS', resultado );
  socket.on('chat_message', async (msg) => {
      let date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss')
      msj = { ...msg, id: socket.id, date: date }
      await messegesCollection.saveMessage(msj) 
      console.log("mensaje en soket:", msj)
      io.sockets.emit('new_message', msj)
  })
});


const PORT = 8080
const server = httpServer.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));