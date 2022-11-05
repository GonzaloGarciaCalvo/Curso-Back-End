const express = require("express");
const { Router } = express
const infoRouter = new Router()
const numCPUs = require('os').cpus().length
const {loggerConsole} = require('../loggers/winston');

infoRouter.get('/info', (req, res) => {
  loggerConsole.log('info', 'peticion a info')
  
  //Info de la session
  /* console.log('argumentos ', process.argv)
  console.log('directorio', process.cwd())
  console.log('id proceso ', process.pid)
  console.log('version node ', process.version)
  console.log('sistema operativo ', process.platform)
  console.log('uso memoria (rss)', process.memoryUsage().rss)
  console.log('cantidad de procesadores',numCPUs) */

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