const express = require("express");
const { Router } = express
const infoRouter = new Router()

infoRouter.get('/info', (req, res) => {
  res.send({
      'argumentos': process.argv, 
      'directorio': process.cwd(),
      'id proceso': process.pid,
      'version node': process.version,
      'titulo': process.title,
      'sistema operativo': process.platform,
      'uso memoria (rss)': process.memoryUsage().rss
  })
})
module.exports = infoRouter