const express = require('express');
const {Router} = express

const routerMensajes= Router()
const {getMsjController, saveMsjController, getMsjByEmailController} = require('../controllers/controller-mensajes')



//CRUD
routerMensajes.get('/', getMsjController)
routerMensajes.post('/', saveMsjController)
routerMensajes.get('/:email', getMsjByEmailController)




module.exports = routerMensajes