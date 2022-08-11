const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Contenedor = require('./ClaseContenedor')
const contenidoArchivo = new Contenedor('./productos.txt')
const { engine } = require( "express-handlebars");


/* app.use(express.urlencoded({ extended: true })) //En este orden no funciona !!
app.use(express.static('public'))
app.use(express.json) */

app.use(express.json());
app.use(express.urlencoded({extends:true}));
//Advertencia NODE body-parser deprecated undefined extended: provide extended option server.js:14:17
app.use(express.static('public'));

app.set("view engine", "pug");
app.set("views", "./views");

////
app.post('/productos', async (req,res) =>{ // NO FUNCIONA
  const dataForm = req.body
  await contenidoArchivo.save(dataForm)
 res.redirect('/')
})

app.get('/productos', async (req, res) => {
  const productos =  await contenidoArchivo.getAll()
  res.render("vista", {
      productos: productos,
      hayProductos: productos.length
  });
})

const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));