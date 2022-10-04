const socket = io();

socket.on('connection', (socket) => {
    console.log('usuario conectado');
})

//////// CHAT /////////
socket.on('new_message', (msg) => {
    agregarMasajes(msg)
});

const authors = new normalizr.schema.Entity('authors');
const mensajeSchema = new normalizr.schema.Entity('mensajes', { author: authors }, { idAttribute: 'id' })
const file = [mensajeSchema]
socket.on('MENSAJES_EXISTENTES', (a) => {
    
    const desnormalizar = normalizr.denormalize(a.result, file, a.entities);
    
    desnormalizar?.forEach(element => {
        if (element) return agregarMasajes(element)
    });
})
socket.on('porcentaje', async (a,b) => {
    console.log('a ', a)
    console.log("b ", b)
   await compresion(a,b)
})

const enviarMensaje = () => {
    
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const edad = document.getElementById("edad").value
    const alias = document.getElementById("alias").value
    const avatar = document.getElementById("avatar").value
    const text = document.getElementById("mensaje").value
    const correo= document.getElementById('correo').value
    const mensaje = {
        author: {
            id:correo,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar
        },
        text: text
    }

    socket.emit('chat_message', mensaje)
}


const agregarMasajes = (msg) => {
   
   
        const box = document.getElementById('post').innerHTML += `
        <div class='card'>
            <b style='color:blue'>${msg.author.alias}</b> 
            <img src="${msg.author.avatar}">
            <p style='color:green; font-style: italic' >${msg.text}</p>
        </div>
        `
    
}

const compresion = (a,b) => {
    // b peso original
    let desnormalizar = normalizr.denormalize(a.result, file, a.entities);
    /* console.log("desnormalizar  ",desnormalizar)
    console.log(" b peso original", b) */
    let desnormalizarPeso = JSON.stringify(desnormalizar).length / 1024
    /* console.log("desnormalizarPeso  ",desnormalizarPeso) */
    let resultado = ((parseFloat(b/desnormalizarPeso)*100)-100).toFixed(2)
    
    console.log("resultado compresión ",resultado)
    const div = document.getElementById('compresion').innerHTML += `
    <div class='card'>
        <p> La compresion es de ${resultado} %</p>
    </div>
    `
}

