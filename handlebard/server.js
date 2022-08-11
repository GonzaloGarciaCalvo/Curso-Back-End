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
//Advertencia NODE body-parser deprecated undefined extended: provide extended option server.js:14:17, pero sin eso no trae el body
app.use(express.static('public'));

app.engine(
  "hbs",
  handlebars.engine({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + "/views/layout"
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

////
app.post('/productos', async (req,res) =>{
  const dataForm = req.body  
  console.log("req.b.n", req.body.nombre)
  console.log("req.body ", req.body)  // NO FUNCIONA, solo llega id desde req
  await contenidoArchivo.save(dataForm)
 res.redirect('/')
})

app.get('/productos', async (req, res) => {
  const productos =  await contenidoArchivo.getAll()
  res.render("main", {
      productos: productos,
      hayProductos: productos.length
  });
})


////
const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));