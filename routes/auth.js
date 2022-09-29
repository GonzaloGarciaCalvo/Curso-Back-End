const express = require("express");
const { Router } = express
const path = require('path')

const authRouter = new Router()


authRouter.get('/', (req, res) => {
    /* res.render('./pages/home.ejs') */
    res.render(path.join(process.cwd(),'views/pages/home.ejs' )) 
  })
  
  authRouter.get('/home', (req, res) => {
    const nombre =req.session
    console.log("nombre en ruta (antes del if) ", nombre)
    if (req.session?.nombre) {
        const nombre =req.session.nombre
        console.log("nombre en ruta ", nombre)
        res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre:nombre })
    } else {
        console.log ("rebotado")
        res.redirect('/login')
    }
  })

authRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {(console.log("nombre ", nombre))}
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authRouter.get('/logout', (req, res) => {
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

/* authRouter.post('/login', (req, res) => {
        console.log("1) req.body.nombre nombre en authRouter.post('/login',", req.body.nombre)//ok
        let name = req.body.nombre
        const mySession = req.session
        console.log("mySession ", mySession)
        req.session.nombre = name
        console.log("2) req.session.nombre en authRouter.post('/login', ", req.session)// UNDEFINED
        res.redirect('/home')
}) */
authRouter.post('/login', (req, res) => {
    let name = req.body.nombre
    /* req.session.nombre = name */
    req.session = {nombre:req.body.nombre}
    console.log("req.session.nombre ", req.session.nombre)// UNDEFINED
    res.redirect('/home')
})


module.exports = authRouter