const express = require("express");
const { Router } = express
const randomsRouter = new Router()
const {loggerConsole} = require('../loggers/winston');

const { fork } = require('child_process')
randomsRouter.get('/api/randoms', (req, res) => {
    loggerConsole.log('info', 'peticion a api/randoms')
    const cant = req.query.cant || 100000000
    console.log("cant en ruta ", cant)
    const child = fork('./child.js')
    child.send(cant)
    console.log(process.argv)
    child.on('message', result => {
        res.send({result:result, process:process.argv })
    })
})

module.exports = randomsRouter