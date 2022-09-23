const moongose = require ('mongoose');


async function connection() {

    const URLstring = `mongodb+srv://lopeza93:River2022@firstcloster.cxeka9h.mongodb.net/entrega10?retryWrites=true&w=majority`

    const ruta = await moongose.connect(URLstring)
    return ruta
}
module.exports = connection