const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const session = require('express-session')

const MongoStore = require('connect-mongo');
const mongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

/* const compression = require('compression')
app.use(compression()) */
const {loggerConsole, loggerWarn, loggerError} = require('./loggers/winston');

require('dotenv').config();

const passport = require('./authentication/passport');
/* const { Types } = require('mongoose') */

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const parseArgs = require('minimist');
/* const connectionOptions = {
    alias: {
        p: "port",
        m: "mode" 
    },
    default: {
        port: 8080,
    }
}
const configServer = parseArgs(process.argv.slice(2), connectionOptions); */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Routers

const routerCarrito = require('./routes/routerCarrito')
const routerProductos = require('./routes/routerProductos')
const authRouter = require('./routes/auth')
const routerOrdenes = require('./routes/routerOrden')
const routerMensajes = require('./routes/routerMensajes')
/* const randomsRouter = require('./routes/randoms')
const infoRouter = require('./routes/info') */

app.set('view engine', 'ejs')

const {save, verMsj} = require("./normalizado/mensajes");
const { builtinModules } = require('module');

/* app.use('/', productos) */
/* app.use('/', randomsRouter) */
app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/api/ordenes', routerOrdenes)
app.use('/api/mensajes', routerMensajes)

/* mongoUrl: 'mongodb+srv://garciacalog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test', */

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
        mongoOptions,
        maxAge:600000,
        retries: 0
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}))


io.on('connection', async (socket) => {
    socket.on("chat_message", (msj)=> {
        save(msj)
        io.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024

    io.sockets.emit('MENSAJES_EXISTENTES', getAll)
    io.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})


//Inicializacion passport
app.use(passport.initialize());
app.use(passport.session())
/* const userNameGlobal = {username:null};
module.exports = userNameGlobal */

// uso Router authRouter
app.use('/',authRouter)
authRouter.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(`<h1> Ruta ${req.url} no implementada</h1>` )
})



if (process.env.MODE =="cluster") {
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        httpServer.listen(process.env.PORT || 8080)
        console.log("en else")
        console.log(`Worker ${process.pid} started`)
    }
} else if (process.env.MODE =="fork")  {
    httpServer.listen(process.env.PORT, () => {
        console.log(`Servidor online puerto ${process.env.PORT || 8080}`)
        /* loggerConsole.log('debug', `Servidor online puerto ${process.env.PORT || 8080}`) */
    })
    .on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); 
}



/* console.log(`Servidor online puerto ${process.env.PORT || 8080}`) */

/* module.exports = app */

//logica desafio clase 30
//console.log("m: ", configServer.m || "FORK")
// if (configServer.m =="cluster") {
//     if (cluster.isPrimary) {
//         console.log(`Master ${process.pid} is running`)
//         for (let i = 0; i < numCPUs; i++) {
//             cluster.fork()
//         }
//         cluster.on('exit', (worker, code, signal) => {
//             console.log(`worker ${worker.process.pid} died`)
//         })
//     } else {
//         httpServer.listen(configServer.p || 8080)
//         console.log("en else")
//         console.log(`Worker ${process.pid} started`)
//     }
// } else if (configServer.m =="fork" || !configServer.m)  {
//     httpServer.listen(configServer.p, () => {
//         /* console.log(`Servidor online puerto ${configServer.p || 8080}`) */
//         loggerConsole.log('debug', `Servidor online puerto ${configServer.p || 8080}`)
//     })
//     .on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); 
// }

/* module.exports = app */

