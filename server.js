const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')  
const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./ClaseContenedor')
const productsCollection = new Contenedor('./productos.txt')
const messegesCollection = new Contenedor('./mensajes.json')

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

/* app.get('/productos', async (req, res) => { 
  const productos =  await productsCollection.getAll()
  res.render("vista", {
      productos: productos,
      hayProductos: productos.length
  });
}) */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})


//Configuracion del socket
io.on('connection',  socket => {
  console.log('cliente online ');
  // carga inicial de productos
  socket.emit('productos', productsCollection.getAll());

  // actualizacion de productos
  socket.on('update', producto => {
      productosApi.guardar(producto)
      io.sockets.emit('productos',  productsCollection.getAll());
  })

  // carga inicial de mensajes
  socket.emit('mensajes',  messegesCollection.getAll());

  // actualizacion de mensajes
  socket.on('nuevoMensaje', async mensaje => {
      mensaje.fyh = new Date().toLocaleString()
       mensajesApi.guardar(mensaje)
      io.sockets.emit('mensajes',  messegesCollection.getAll());
  })
});


const PORT = 8080
const server = httpServer.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));