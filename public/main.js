const socket = io();

const addProduct = document.querySelector('#addProduct') //funciona
addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        nombre: addProduct[0].value,
        categoria: addProduct[1].value,
        precio: addProduct[2].value,
        thumbnail: addProduct[3].value
    }
    socket.emit('update', producto);
    addProduct.reset()
})

socket.on('productos', async (productos) =>  {
    socket.on('productos', productos => {
        makeTable(productos).then(html => {
            document.getElementById('productos').innerHTML = html
        })
    });
     function makeTable(producto) {  //no funciona
        console.log("! makeTable")
        let response = fetch('views/vista.ejs')
            .then(response => response.text())
            .then(plantilla => {
                let template = response.render(plantilla, {
                productos: producto,
            })
            return template
            }) 
    }
    

     /* productos.map(prod =>{ 
     
     const templateHtml= (producto) =>{
        `<tr>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        </tr>
        `
    }
    return document.getElementById('productos').innerHTML = templateHtml
    }) */
});


//////// CHAT messeges /////////
socket.on('new_message', (msg) => {
    agregarMensajes(msg)

});

socket.on('MENSAJES_GUARDADOS', (a)=>{
    a.forEach(element => {
        return agregarMensajes(element)
    });
})

const enviarMensaje = () => {
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    socket.emit('chat_message', { correo, mensaje })
}
const agregarMensajes = (msg) => {
    const box = document.getElementById('post').innerHTML += `
    <div class='card'>
        <b style='color:blue'>${msg.correo}</b> <span style='color:brown'>[${msg.date}]</span> <p style='color:green; font-style: italic' >${msg.mensaje}</p>
    </div>
    `
}
