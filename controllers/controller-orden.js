const express = require('express');
const orden = require('../api/ordenes')
const mailOrden = require("../utils/mailer");

const generateOrderController = async (req, res) => {
    
  const { email, productos, ciudad, direccion, total } = req.body;
  const getAll = await orden.getAll();
  console.log("en generateOrderController")

  let numero = getAll.length + 1;

  let newOrden =  {
    email,
    productos,
    ciudad,
    direccion,
    total,
    numero,
  };
  const savedOrder = await orden.save(newOrden);
  console.log("savedOrder en controller-orden:", savedOrder)

  if (savedOrder) {
    mailOrden(email, savedOrder);
    res.json(savedOrder);
  } else {
    res.status(405).json({ message: "Error, vuelva a intentarlo" });
  }
};

const getOrderByUserController = async (req, res) => {
  const email = req.params.email;
  const savedOrder = await orden.getByEmail(email);
  console.log("savedOrder", savedOrder)
  const orders = savedOrder.map((item) => {
    let order = {
      email: item.email,
      numero: item.numero,
      productos: item.productos,
      estado: item.estado,
      fecha: item.timestamp.toString(),
      total: item.total,
    };
    return order; 
  });

  savedOrder?.length !== 0
    ? res.json(orders)
    : res.json({ message: "No hay ordenes guardadas" });
};
module.exports = { generateOrderController, getOrderByUserController };