/* mongodb+srv://garciacalvog:<password>@cluster0.qju9tzm.mongodb.net/?retryWrites=true&w=majority */

const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

const moment = require('moment-timezone');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* const cookieParser = require("cookie-parser"); */
const session = require('express-session')
console.log("session en server ", session)
/* const logger = require("morgan"); */
const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const PORT = 8080
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const productos= require('./routes/productos')
const auth = require('./routes/auth')

app.set('view engine', 'ejs')

const {save, verMsj} = require("./controllers/mensajes")
app.use('/', auth)
app.use('/', productos)
app.use(session({
    //Base de datos Mongo
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

/* app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/pages/login.html")
    //res.sendFile(__dirname + "/public/index.html")//  
}) */


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


httpServer.listen(PORT, () => {
    console.log(`Servidor online puerto ${PORT}`)
})