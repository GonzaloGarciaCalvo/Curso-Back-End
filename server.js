const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

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




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const productos= require('./routes/productos')
const authRouter = require('./routes/auth')
const path = require('path')

app.set('view engine', 'ejs')

const {save, verMsj} = require("./controllers/mensajes")

app.use('/', productos)

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.qju9tzm.mongodb.net/usuarios?retryWrites=true&w=majority',
        mongoOptions,
        maxAge:600000,
        retries: 0
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}))


io.on('connection', async (socket) => {
    /* console.log('conectado al servidor io') */
    socket.on("chat_message", (msj)=> {
        save(msj)
        io.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024

    io.sockets.emit('MENSAJES_EXISTENTES', getAll)
    io.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})


/* app.use(express.static('public')); */
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
        /* console.log("en passport: ") */
        try {
            const user = await User.findOne({ username });
            /* console.log("user", user) */
            const hassPass = user?.password
            if (!user || !comparePassword(password, hassPass)) {
                return done(null, false)
            } else {
                /* console.log('user:', user) */
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
    {  passReqToCallback: true},  //con esto da error un un objeto que no se de donde sale (no entra a mongo atlas), 
    //sin eso da error  req.isAuthenticated is not a function pero entra a mongo atlas
    // cagregando req a la funcion de abajo carga usuario en mongo atlas pero rompe req.isAuthenticated is not a function
    async ( req, username, password, done) => {
       /*  try { */
            console.log(req)
            console.log("passport en signup ")
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
    // console.log('user deserializado', user)
    done(null, user);
});



const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor online puerto ${PORT}`)
})
/* .on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); */