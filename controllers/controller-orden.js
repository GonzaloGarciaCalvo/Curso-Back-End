const express = require('express');
const orden = require('../api/ordenes')

const generateOrderController = async (req, res) => {
    console.log("en generateOrderController")
  const { email, productos, ciudad, direccion, total, numero } = req.body;
  /* const getAll = await orden.getAll();

  let numero = getAll.length + 1; */

  let newOrden =  {
    email,
    productos,
    ciudad,
    direccion,
    total,
    numero,
  };
  const result = await orden.save(newOrden);
  console.log("result en controller-orden:", result)

  if (result) {
    /* mailOrden(email, result); */
    res.json(result);
  } else {
    res.status(404).json({ message: "Error, vuelva a intentarlo" });
  }
};

const getOrderByUserController = async (req, res) => {
  const email = req.params.email;
  const result = await orden.getByEmail(email);
  const orders = result.map((item) => {
    let order = {
      email: item.emaiteml,
      numero: item.numero,
      productos: item.productos,
      estado: item.estado,
      fecha: item.timestamp.toString(),
      total: item.total,
    };
    return order;
  });

  result.length !== 0
    ? res.json(orders)
    : res.json({ message: "No hay ordenes guardadas" });
};
module.exports = { generateOrderController, getOrderByUserController };