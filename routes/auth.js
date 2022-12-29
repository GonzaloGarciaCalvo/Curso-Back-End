const express = require("express");
const { Router } = express
const path = require('path')
const authRouter = new Router()
const auth = require('../middleware/auth')
const passport = require('passport')
const {loggerConsole} = require('../loggers/winston');


// authRouter.get('/', (req, res) => {
//     /* res.render('./pages/home.ejs') */
//     res.render(path.join(process.cwd(),'views/pages/home.ejs' )) 
//   })
  
//   authRouter.get('/home', (req, res) => {
//     const nombre =req.session
//     console.log("nombre en ruta (antes del if) ", nombre)
//     if (req.session?.nombre) {
//         const nombre =req.session.nombre
//         console.log("nombre en ruta ", nombre)
//         res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre:nombre })
//     } else {
//         console.log ("rebotado")
//         res.redirect('/login')
//     }
//   })

// authRouter.get('/login', (req, res) => {
//     const nombre = req.session?.nombre
//     if (nombre) {(console.log("nombre ", nombre))}
//     if (nombre) {
//         res.redirect('/')
//     } else {
//         res.sendFile(path.join(process.cwd(), '/views/login.html'))
//     }
// })

// authRouter.get('/logout', (req, res) => {
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

// authRouter.post('/login', (req, res) => {
//     let name = req.body.nombre
//     /* req.session.nombre = name */
//     req.session = {nombre:req.body.nombre}
//     console.log("req.session.nombre ", req.session.nombre)// UNDEFINED
//     res.redirect('/home')
// })


// module.exports = authRouter

/////////////////////////////////////////

//Routes
/* authRouter.post("/login", passport.authenticate('login', { failureRedirect: '/nocredentials' }), (req, res) => {
    req.session.user = req.user
    
    res.redirect('/pages/home')
}) */
authRouter.post("/login",  
    passport.authenticate('login', { failureRedirect: '/nocredentials' }), 
    (req, res) => {
        loggerConsole.log('info', 'peticion a /')
        /* req.session.user = req.user */
        res.redirect('/home')
        /* res.render('./pages/home') */
    }
)


authRouter.post('/signup',
	passport.authenticate('signup', {
		successRedirect: "/registroExitoso", 
		failureRedirect: "/errorRegister",   
	}),
	(req, res) => {
		res.redirect("./pages/singupExitoso");
	}
);


authRouter.get('/home', auth, (req, res) => {   
    console.log("peticion a home")
    loggerConsole.log('info', 'peticion a /home')
    /* const email= req.user.username */
    const email= req.user.email
    console.log("email en auth _", email)
    res.render('./pages/home', {
        /* user: req.user, */
        /* email:email */
        user:email
    })

})
authRouter.get('/signup', (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/signup')
    res.render('./pages/signup')
})

authRouter.get('/registroExitoso', (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/registroExitoso')
    res.render('./pages/registroExitoso')
});
/* authRouter.get('/singupExitoso', (req, res) => {
    res.sendFile('./singup.html', {root:'public'})
}); */

//Errores
/* authRouter.get('/userexistente', (req, res) => {
    res.render('./pages/noCredentials', { error: 'Correo electronico ya existente' })
}); */
authRouter.get('/nocredentials', (req, res) =>{
    const email= req.user.email
    const user = req.user
    console.log("email en /noCredentials", email) // OK
    console.log("user en /noCredentials", user)
    loggerConsole.log('info', 'peticion a /pages/noCredentials')
    res.render('./pages/noCredentials', { error: 'Correo o password invalidos' })
});
authRouter.get('/errorRegister', (req, res) =>{
    loggerConsole.log('info', 'peticion a /pages*errorRegister')
    res.render('./pages/errorRegister', { error: 'Registro incorrecto, correo o password invalidos' })
});


//Logout
authRouter.get("/logout", (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/logout')
    const email= req.user.username // username?
    req.session.destroy();
    req.logout(() => {
        res.render('./pages/logout',{email})
    })
});

module.exports= authRouter
