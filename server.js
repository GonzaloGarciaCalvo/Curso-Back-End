const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

/* const moment = require('moment-timezone'); */
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* const cookieParser = require("cookie-parser"); */
const session = require('express-session')

const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

/* require('dotenv').config(); */
const User = require('./utils/userSchema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { hashPassword, comparePassword } = require('./utils/hashPassword');
const { Types } = require('mongoose')

const connection = require('./db/mongo')
/* connection() */


const PORT = 8080
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const productos= require('./routes/productos')
const authRouter = require('./routes/auth')
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
        maxAge:600000,
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
// app.get('/', (req, res) => {
//     /* res.render('./pages/home.ejs') */
//     const nombre =req.session.nombre
//     res.render(path.join(process.cwd(),'views/pages/home.ejs'),{nombre:nombre}) 
// })

// app.get('/home', (req, res) => {
//     if (req.session?.nombre) {
//         const nombre =req.session.nombre
//         console.log("nombre en ruta ", nombre)
//         res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre:nombre })
//     } else {
//         res.redirect('/login')
//     }

//     /* res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre }) */
// })

// app.get('/login', (req, res) => {
//     const nombre = req.session?.nombre

//     if (nombre) {(console.log("nombre en app.get ", nombre))}
//     if (nombre) {
//         res.redirect('/')
//     } else {
//         console.log("reboto login")
//         res.sendFile(path.join(process.cwd(), '/views/login.html'))
//     }
// })

// app.get('/logout', (req, res) => {
//     const nombre = req.session?.nombre
//     if (nombre) {
//         req.session.destroy(err => {
//             if (!err) {
//                 res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
//             } else {
//                 res.redirect('/')
//             }
//         })
//     } else {
//         res.redirect('/')
//     }
// })

// app.post('/login', (req, res) => {
//     let name = req.body.nombre
//     req.session.nombre = name
//     console.log("req.session.nombre en post login", req.session.nombre)// UNDEFINED
//     res.redirect('/home')
// })

// Router
app.use('/',authRouter)
authRouter.use(express.static('public'));

//Inicializacion passport
app.use(passport.initialize());
app.use(passport.session())

//Strategyes

//Login
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        console.log("en passport: ")
        try {
            const user = await User.findOne({ username });
            console.log("user", user)
            const hassPass = user?.password
            if (!user || !comparePassword(password, hassPass)) {
                console.log('Usuario no encontrado o password invalido')
                return done(null, false)
            } else {
                console.log('user:', user)
                return done(null, user)
            }
        }
        catch (error) {
            console.log("error en password: ", error)
            done(error)
        }
    }
))

//Singup
passport.use('signup', new LocalStrategy(
    /* {  passReqToCallback: true}, */ 
    async ( username, password, done) => {
    try {
        const user = await User.findOne({ username });
        console.log("en signup estrategy") // no lo muestra, tampoco los otros
        if (user) {
            console.log("usuario ya existente o error de ingreso de datos")
            return done(null, false)
        }
        const hashedPassword = hashPassword(password);
        const newUser = new User({ username, password: hashedPassword });
        console.log("newUser ",newUser)
        await newUser.save();
        return done(null, newUser);
    } catch(error) {
        console.log(error)
    }
}));

//Serializer
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    // console.log('user deserializado', user)
    done(null, user);
});




httpServer.listen(PORT, () => {
    console.log(`Servidor online puerto ${PORT}`)
})