const express = require('express');
const { Router } = express;
const Contenedor = require('../ClaseContenedor');

const contenidoArchivo = new Contenedor('./productos.txt');
const routerProductos = new Router();
const administrador = true

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

routerProductos.get('/' , async(req, res)=>{  
  const resultado = await contenidoArchivo.getAll() 
  /* console.log("resultado:  ",resultado) */
  res.send(resultado)
})
routerProductos.get('/:id', async(req, res)=>{ 
  const id = req.params.id
  const numberId = Number(id) // para mantener el === en el find del metodo
  const resultado = await contenidoArchivo.getById(numberId) 
  /* console.log("resultado:  ",resultado)  */
  res.json(resultado) 
})

routerProductos.post('/', async(req,res) => {
  /* const {nombre, categoria, precio, thumbnail} = req.body */ //con esto el evento submit se dispara con cada entrada de teclado
  if (administrador) {
    const datosproductoNuevo = req.body
    /* console.log(datosproductoNuevo) */
    const productoAgregado = await contenidoArchivo.save(datosproductoNuevo)
    res.send(
      `<h1>id producto agragado: ${productoAgregado}</h1>` 
    )
  } else res.send('ruta no autorizada')
})
routerProductos.put('/:id', async(req, res) =>{ 
  if (administrador) {
    const id = req.params.id
    console.log(req.params)
    const numberId = Number(id) // para mantener el === en el find del metodo
    const item = req.body;
    const itemUpdate = await contenidoArchivo.updateItem(item, numberId); 
    res.send(itemUpdate);
  } else res.send('ruta no autorizada')
})

routerProductos.delete('/:id', async(req, res)=>{ 
  if (administrador) {
    const id = req.params.id
    const numberId = Number(id) 
    const resultadoDelete = await contenidoArchivo.deleteById(numberId) 
    res.json({
        result:"eliminado",
        id:id
    }) 
  } else res.send('ruta no autorizada')
})

module.exports = routerProductos