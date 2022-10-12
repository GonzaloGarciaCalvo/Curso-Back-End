const express = require("express");
const { Router } = express
const randomsRouter = new Router()

const { fork } = require('child_process')
randomsRouter.get('/api/randoms', (req, res) => {
    const cant = req.query.cant || 100000000
    console.log("cant en ruta ", cant)
    const child = fork('./child.js')
    child.send(cant)
    child.on('message', result => {
        res.send({result})
    })
})

module.exports = randomsRouter