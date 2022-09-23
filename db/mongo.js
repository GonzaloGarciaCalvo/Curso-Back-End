const moongose = require ('mongoose');


async function connection() {

    const URLstring = `mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.qju9tzm.mongodb.net/?retryWrites=true&w=majority`

    const ruta = await moongose.connect(URLstring)
    return ruta
}
module.exports = connection