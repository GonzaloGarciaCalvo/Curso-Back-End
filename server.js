const express = require('express')
const fs = require("fs")
const Contenedor = require("./claseContenedor");
const contenidoArchivo = new Contenedor('./productos.txt');
const { Router } = express


const app = express()
app.use(express.json())
app.use(express.static(__dirname + 'public'))
const routerProductos = Router()


routerProductos.get('/' , async(req, res)=>{  
    const resultado = await contenidoArchivo.getAll() 
    console.log("resultado:  ",resultado)
    res.send(resultado)
})
routerProductos.get('/:id', async(req, res)=>{ 
    const id = req.params.id
    const numberId = Number(id) // para mantener el === en el find del metodo
    const resultado = await contenidoArchivo.getById(numberId) 
    /* const filtrado = contenidoArchivo.getById(numberId) 
    const resultado = await filtrado */
    console.log("resultado:  ",resultado) 
    res.json(resultado) 
})

routerProductos.post('/', async(req,res) => { //Pendiente
    const {nombre, categoria, precio, thumbnail} = req.body
    const agregar = contenidoArchivo.save()
    /* res.json({

    }) */
})
routerProductos.put('/:id', async(req, res) =>{ //pendiente
    const id = req.params.id
    const numberId = Number(id) // para mantener el === en el find del metodo
    const resultado = await contenidoArchivo.getById(numberId)
    const inputs =req.body
    res.json({
        nombre: req.body.nombre || nombre,
        categoria: req.body.categoria || categoria,
        precio:req.body.precio || precio,
        thumbnail,
        id
    }) 
})

routerProductos.delete('/:id', async(req, res)=>{ 
    const id = req.params.id
    const numberId = Number(id) // para mantener el === en el find del metodo
    const resultado = await contenidoArchivo.deleteById(numberId) 
    /* const filtrado = contenidoArchivo.getById(numberId) 
    const resultado = await filtrado */
    console.log("resultado:  ",resultado) 
    res.json(resultado) 
})


app.use('/api/productos', routerProductos)

const PORT = 8080
const server = app.listen(PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${ server.address().port }`)
}).on('error', (e) => console.log('Error: ', e.message));

