const express = require('express')
const fs = require("fs")
const Contenedor = require("./claseContenedor");
const contenidoArchivo = new Contenedor('./productos.txt');
const { Router } = express


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* app.use(express.static(__dirname + 'public')) */ 
app.use(express.static('public'))
const routerProductos = Router()


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
    const datosproductoNuevo = req.body
    /* console.log(datosproductoNuevo) */
    const productoAgregado = await contenidoArchivo.save(datosproductoNuevo)
    res.send(
       `<h1>id producto agragado: ${productoAgregado}</h1>` 
    )
})
routerProductos.put('/:id', async(req, res) =>{ //
    const id = req.params.id
    console.log(req.params)
    const numberId = Number(id) // para mantener el === en el find del metodo
    const item = req.body;
    const itemUpdate = await contenidoArchivo.updateProduct(item, numberId); 
    res.send(itemUpdate);
})

routerProductos.delete('/:id', async(req, res)=>{ 
    const id = req.params.id
    const numberId = Number(id) 
    const resultadoDelete = await contenidoArchivo.deleteById(numberId) 
    res.json({
        result:"eliminado",
        id:id
    }) 
})


app.use('/api/productos', routerProductos)

const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));

