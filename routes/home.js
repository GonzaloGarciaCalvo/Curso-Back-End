// const express = require("express");
// const { Router } = express
// const path = require('path')

// const homeRouter = new Router()


// homeRouter.get('/', (req, res) => {
//   /* res.render('./pages/home.ejs') */
//   res.render(path.join(process.cwd(),'views/pages/home.ejs' )) 
// })

// homeRouter.get('/home', (req, res) => {
//   const nombre =req.session
//   console.log("nombre en ruta (antes del if) ", nombre)
//   if (req.session?.nombre) {
//       const nombre =req.session.nombre
//       console.log("nombre en ruta ", nombre)
//       res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre:nombre })
//   } else {
//       console.log ("rebotado")
//       res.redirect('/login')
//   }
// })

// module.exports = homeRouter
