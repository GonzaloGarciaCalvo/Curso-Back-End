const express = require("express");
const { Router } = express
const infoRouter = new Router()
const numCPUs = require('os').cpus().length
const {loggerConsole} = require('../loggers/winston');

infoRouter.get('/info', (req, res) => {
  loggerConsole.log('info', 'peticion a info')
  res.send({
      'argumentos': process.argv, 
      'directorio': process.cwd(),
      'id proceso': process.pid,
      'version node': process.version,
      'titulo': process.title,
      'sistema operativo': process.platform,
      'uso memoria (rss)': process.memoryUsage().rss,
      'cantidad de procesadores':numCPUs,
  })
})
module.exports = infoRouter