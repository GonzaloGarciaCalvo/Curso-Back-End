const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const session = require('express-session')

const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config();
const User = require('./utils/userSchema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { hashPassword, comparePassword } = require('./utils/hashPassword');
const { Types } = require('mongoose')

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const parseArgs = require('minimist');
const connectionOptions = {
    alias: {
        p: "port",
        m: "mode" 
    },
    default: {
        port: 8080,
    }
}/* m: "mode" */
const configServer = parseArgs(process.argv.slice(2), connectionOptions);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Routers
const productos= require('./routes/productos')
const authRouter = require('./routes/auth')
const randomsRouter = require('./routes/randoms')
const infoRouter = require('./routes/info')

app.set('view engine', 'ejs')

const {save, verMsj} = require("./controllers/mensajes")

app.use('/', productos)
app.use('/', randomsRouter)

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


/// Strategies  ///

//Login
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            const hassPass = user?.password
            if (!user || !comparePassword(password, hassPass)) {
                return done(null, false)
            } else {
                return done(null, user)
            }
        }
        catch (error) {
            console.log("error en password: ", error)
            done(error)
        }
    }
))

//Signgup
passport.use('signup', new LocalStrategy(
    {  passReqToCallback: true},  
    async ( req, username, password, done) => {
       /*  try { */
            const user = await User.findOne({ username:username });
            if (user) {
                return done(null, false)
            }
            const hashedPassword = hashPassword(password);
            const newUser = new User({ username:username, password: hashedPassword });
            await newUser.save();
            return done(null, newUser);
       /*  } catch(error) {
            console.log("error en signup ",error)
        } */
}));

//Serializer
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});


app.use('/', infoRouter)

// uso Router authRouter
app.use('/',authRouter)
/* authRouter.use(express.static('public')); */


//logica desafio clase 30
console.log("m: ", configServer.m)
if (configServer.m =="cluster") {
    /* console.log("m no es FORK o no se pas'o el parametro") */
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        httpServer.listen(configServer.p || 8080)
        console.log("en else")
        console.log(`Worker ${process.pid} started`)
    }
} else if (configServer.m =="fork" || !configServer.m)  {
    httpServer.listen(configServer.p, () => {
        console.log(`Servidor online puerto ${configServer.p || 8080}`)
    })
    .on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); 
}


/* httpServer.listen(configServer.p, () => {
    console.log(`Servidor online puerto ${configServer.p || 8080}`)
})
.on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); */