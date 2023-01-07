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
// socket.on('porcentaje', async (a,b) => {
//    /*  console.log('a ', a)
//     console.log("b ", b) */
//    await compresion(a,b)
// })

const enviarMensaje = () => {
    
/*     const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const edad = document.getElementById("edad").value
    const alias = document.getElementById("alias").value
    const avatar = document.getElementById("avatar").value*/
    const text = document.getElementById("mensaje").value 
    const correo= document.getElementById('correo').value
    const mensaje = {
        author: {
            id:correo,
            /* nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar */
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

// const compresion = (a,b) => {
//     // b peso original
//     let desnormalizar = normalizr.denormalize(a.result, file, a.entities);
//     /* console.log("desnormalizar  ",desnormalizar)
//     console.log(" b peso original", b) */
//     let desnormalizarPeso = JSON.stringify(desnormalizar).length / 1024
//     /* console.log("desnormalizarPeso  ",desnormalizarPeso) */
//     let resultado = ((parseFloat(b/desnormalizarPeso)*100)-100).toFixed(2)
    

//     const div = document.getElementById('compresion').innerHTML += `
//     <div class='card'>
//         <p> La compresion es de ${resultado} %</p>
//     </div>
//     `
// }

////////////////////////////////////   
///  mostrar productos en home  ///
//////////////////////////////////
let productsGallery=[];
const getproducts = fetch('http://localhost:8080/api/productos')
.then(response => response.json())
.then(data => {
    productsGallery = data
    if (productsGallery) { 
        console.log("en if  producstGallery", productsGallery)
        const gallery = document.getElementById('products')
        for (prod of productsGallery){
            /* console.log("en forEach") */
            let contenedor = document.createElement("div");
            contenedor.classList.add("m-5")
            /* console.log("contenedor ",contenedor) */
            contenedor.innerHTML= `
                <h3>${prod.nombre}</h3>
                <h4>Precio $${prod.precio}</h4>
                <h3>${prod.thumbnail}</h3>
            `
            gallery.append(contenedor)
        }
    }
    })
.catch(err => console.log("error  !!: ",err))

////////////////////////////////////   
///  mostrar carrito   en home  ///
//////////////////////////////////
let cartId;
// const createCart = fetch('http://localhost:8080/api/carritos', { 
//     method: 'POST',
//     /* headers: {"Content-type": "application/json;charset=UTF-8"} */
// })
// .then(response => {
//     /* response.json(); */
//     console.log("repuesta api ", response)
// })
// .then(data => {
//     /* cartId = data; */
//     console.log("cartId", data) // llega undefined
// })
// .catch(error => console.log("error de catch", error))

///////////////////////////////////////
// const getCarts = fetch('http://localhost:8080/api/carritos', { 
//     method: 'GET',
//     /* headers: {"Content-type": "application/json;charset=UTF-8"} */
// })
// .then(response => {
//     response.json();
//    /*  console.log("repuesta api ", response) */
//    console.log("typeof response.json ", typeof(response))
// })
// .then(data => {
//     /* cartId = data; */
//     console.log("carts", data?.body) // llega undefined
// })
// .catch(error => console.log("error de catch", error))
let cartCreated = null;
async function getCartId () {
    try {
        const response = await fetch('http://localhost:8080/api/carritos',{
            method: 'POST'
        })
        const data = await response.json()
        console.log("data  ",data)
        cartCreated = data
        return data
    }  catch (error) {
        console.log(error)
    }
}
/* getCartId() */

async function getCartProducts () {
    console.log(" en getCartProducts")
    try {
        const response = await fetch(`http://localhost:8080/api/carritos/${cartCreated}/productos`,{
            method: 'GET'
        })
        const data = await response.json()
        console.log("data  ",data)
        return data
    }  catch (error) {
        console.log(error)
    }
}

/* const showCart = async () => cartCreated? await getCartProducts() : null 

showCart() */
async function cartDisplay () {
    if (cartCreated === null) {
        getCartId()
    } else {
        console.log('en else cartDisplay')
        getCartProducts()
    }
}

cartDisplay()


