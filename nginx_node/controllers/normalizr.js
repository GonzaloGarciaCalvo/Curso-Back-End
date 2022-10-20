const { normalize, schema, desnormalize } = require( "normalizr");

const author = new schema.Entity('authors')

const mensaje = new schema.Entity('mensajes', {
    author: author
}, {idAttribute: '_id'})


const normalizar = (data) => {
    let allMessages = data.map(msg => {return {...msg._doc, _id: msg._id.toString()}})
    const _normalized = normalize(allMessages, [mensaje])
    return _normalized
}

module.exports = normalizar