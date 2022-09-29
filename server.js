const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

const moment = require('moment-timezone');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* const cookieParser = require("cookie-parser"); */
const session = require('express-session')

const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const PORT = 8080
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const productos= require('./routes/productos')
/* const auth = require('./routes/auth') */
/* const home = require('./routes/home') */
const path = require('path')

app.set('view engine', 'ejs')

const {save, verMsj} = require("./controllers/mensajes")
/* app.use('/', auth) */
/* app.use('/',home) */
app.use('/', productos)
app.use(session({
    
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.qju9tzm.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions,
        ttl: 600,
        retries: 0
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}))


io.on('connection', async (socket) => {
    console.log('conectado al servidor io')
    socket.on("chat_message", (msj)=> {
        save(msj)
        io.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024
    /* console.log("getAllPesoOriginal", getAllPesoOriginal) */

    io.sockets.emit('MENSAJES_EXISTENTES', getAll)
    io.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})

//Rutas login/logout/home
app.get('/', (req, res) => {
    /* res.render('./pages/home.ejs') */
    const nombre =req.session.nombre
    res.render(path.join(process.cwd(),'views/pages/home.ejs'),{nombre:nombre}) 
})

app.get('/home', (req, res) => {
    if (req.session?.nombre) {
        const nombre =req.session.nombre
        console.log("nombre en ruta ", nombre)
        res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre:nombre })
    } else {
        res.redirect('/login')
    }

    /* res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre }) */
})

app.get('/login', (req, res) => {
    const nombre = req.session?.nombre

    if (nombre) {(console.log("nombre en app.get ", nombre))}
    if (nombre) {
        res.redirect('/')
    } else {
        console.log("reboto login")
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

app.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

app.post('/login', (req, res) => {
    let name = req.body.nombre
    req.session.nombre = name
    console.log("req.session.nombre en post login", req.session.nombre)// UNDEFINED
    res.redirect('/home')
})

httpServer.listen(PORT, () => {
    console.log(`Servidor online puerto ${PORT}`)
})