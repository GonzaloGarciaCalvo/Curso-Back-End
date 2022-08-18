const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')  
const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./ClaseContenedor')
const productsCollection = new Contenedor('./productos.txt')
const messegesCollection = new Contenedor('./mensajes.txt')

app.use(express.json());
app.use(express.urlencoded({extends:true}));
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
  socket.on('add-product', async (producto) => {  //recibe el producto de main.js del cliente
    await productsCollection.save(producto)
    const getProducts =await productsCollection.getAll()
    console.log("getP en actualizacion", getProducts) //
      io.sockets.emit('productos', getProducts);
  }) 


  //Chat
  const resultado = await messegesCollection.getMesseges()
  /* console.log("resultado",resultado) */
  socket.emit('MENSAJES_GUARDADOS', resultado );
  socket.on('chat_message', (msg) => {
      msj = { ...msg, id: socket.id, date: new Date }
      messegesCollection.saveMessege(msj) 
      /* console.log("mensaje:", msj) */
      io.sockets.emit('new_message', msj)
  })
});


const PORT = 8080
const server = httpServer.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));