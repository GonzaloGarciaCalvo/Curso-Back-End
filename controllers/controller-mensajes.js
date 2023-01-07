const message = require("../api/mensajes");
/* const { Mensajes } = require("../utils/schemas/schemas"); */
/* const mensajesSchema = new Schema({
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  texto: { type: String, required: true, max: 400 },
});
const Mensajes = mongoose.model("mensajes", mensajesSchema); */
/* const message = new MensajesMongo(); */

const saveMsjController = async (req, res) => {
  const { email, texto,} = req.body;
  const newMsj = {
    email: email,
    texto: texto,
  };
  const result = await message.save(newMsj);
  result
    ? res.json(result)
    : res.json({ message: "Error, vuelva a intentarlo" });
};

const getMsjController = async (req, res) => {
  const getAll = await message.getAll();
  const mensj = getAll.map((i) => {
    let mensaje = {
      email: i.email,
      texto: i.texto,
      fecha: i.timestamp,
    };
    return mensaje;
  });
  res.send(mensj);
};
const getMsjByEmailController = async (req, res) => {
  const email = req.params.email;
  const getByEmail = await message.getByEmail(email);
  const mensj = getByEmail.map((i) => {
    let mensaje = {
      email: i.email,
      texto: i.texto,
    };
    return mensaje;
  });
  res.send(mensj);
};

module.exports = { getMsjController, saveMsjController, getMsjByEmailController };