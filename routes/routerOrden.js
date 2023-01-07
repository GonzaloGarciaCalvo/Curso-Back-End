const express = require('express');
const {Router} = express;
const {
  generateOrderController, 
  getOrderByUserController
} = require('../controllers/controller-orden')
const routerOrden = Router()


routerOrden.use(express.json());
routerOrden.use(express.urlencoded({ extended: true }));
routerOrden.post('/', generateOrderController)
routerOrden.get('/:email', getOrderByUserController)

module.exports = routerOrden