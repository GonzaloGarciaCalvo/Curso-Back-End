const express = require('express');
const {Router} = express;
const {
  generateOrderController, 
  getOrderByUserController
} = require('../controllers/controller-orden')
const routerOrden = Router()
// const cors = require('cors')
// ordenRoute.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://puzzlesmongodb.netlify.app")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//CRUD

routerOrden.post('/', generateOrderController)
routerOrden.get('/:email', getOrderByUserController)
module.exports = routerOrden