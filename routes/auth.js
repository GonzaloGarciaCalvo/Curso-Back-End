const express = require("express");
const { Router } = express
const path = require('path')

const authRouter = new Router()

authRouter.get('/', (req, res) => {
    /* res.render('./pages/home.ejs') */
    res.render(path.join(process.cwd(),'views/pages/home.ejs' )) 
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

authRouter.post('/login', (req, res) => {
        console.log("1) req.body.nombre nombre en authRouter.post('/login',", req.body.nombre)//ok

        req.session.nombre = req.body.nombre
        console.log("2) req.session.nombre en authRouter.post('/login', ", req.session.nombre)// UNDEFINED
        res.redirect('/home')
})


module.exports = authRouter