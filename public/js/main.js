const socket = io();


// const addProduct = document.querySelector('#addProduct') //funcionaba con el renderTemplate harcodeado, ahora da error con el archivo ejs.js
// /* console.log("addP", addProduct)  */// daba null, faltaba onsubmit="return sendProduct(this)"  en el FORM
// addProduct.addEventListener("submit", (e) => {
//     e.preventDefault()
//     const producto = {
//         nombre: addProduct[0].value,
//         categoria: addProduct[1].value,
//         precio: addProduct[2].value,
//         thumbnail: addProduct[3].value
//     }
//     socket.emit('update', producto);
//     /* addProduct.reset() */
//     return false
// })

socket.on('productos-guardados', productos =>  {
    const productsContainer = document.getElementById('productos')
    fetch('../views/vista.ejs')
        .then(response => response.text())
        .then(plantilla => {
            let html = ejs.render(plantilla, { 
            productos})
            productsContainer.innerHTML = html
        }) 
});

 const sendProduct = (e) => {

    const nombre = document.querySelector('#nombre');
    const categoria = document.querySelector('#categoria');
    const precio = document.querySelector('#precio');
    const thumbnail = document.querySelector('#thumbnail');
    
    const producto = {
        nombre: nombre.value,
        categoria: categoria.value,
        precio: Number(precio.value),
        thumbnail: thumbnail.value
    }
    console.log("prod ", producto)
    socket.emit('add-product', producto);
    console.log("sendProduct !!")
    /* title.value = '';
    price.value = '';
    thumbnail.value = ''; */

    return false; 
} 

//////////////////////////////////////////////////////////////
////  FUNCIONA  hardcodeado horrible pero renderiza    //////
/* const renderTemplate = (data) => {   
    const productsList = document.querySelector('#productos')
    console.log("listadoProductos", productsList)
    const html = data.map(product =>    `<tr>
                                            <td>${product.nombre}</td>
                                            <td>Precio: ${product.precio}</td>
                                            <td><img src="${product.thumbnail}" width="70px" alt="img"></td>
                                            <td>${product.id}</td>
                                        </tr>
                                        `)

    productsList.innerHTML += html
}

socket.on('productos-guardados', data => {
    console.log("data", data)  // llega
    renderTemplate(data) //renderiza como objeto sin las etiquetas 
}) */

/* socket.on('productos-guardados', async (productos) =>  {
        console.log("productos en socket.on", productos) //entra
        console.log("ejs", ejs)  // ejs is not defined
        const productsContainer = document.getElementById('productos')
        return await fetch('../views/vista.ejs')
            .then(response => response.text())
            .then(plantilla => {
                let html = ejs.render(plantilla, { // tira ERROR  main.js:27 Uncaught (in promise) ReferenceError: response is not defined
                productos
                })
                productsContainer.innerHTML = html
            }) 
}); */
////////////////////////////////////////////////////////////////

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
        <p style='color:blue'>${msg.correo}</p> <p style='color:brown'>[${msg.date}]</p> <p style='color:green; font-style: italic' >${msg.mensaje}</p>
    </div>
    `
}
