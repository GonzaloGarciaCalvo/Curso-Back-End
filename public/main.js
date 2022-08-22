const handleGetById = () => {
  const id= document.getElementById('prodId').value
  fetch(`http://localhost:8080/api/productos/${id}`)
      .then(data => {
          window.location.replace(data.url);;
      })
      .then(post => {
          console.log(post.title);
      });
};

const handleDeleteById = () => {
  const id= document.getElementById('deletId').value
  fetch(`http://localhost:8080/api/productos/${id}`, {method: 'DELETE'})
      .then(data => {
          window.location.replace(data.url);;
      })
};

const getCart = () => {
  const id= document.getElementById('cartId').value
  fetch(`http://localhost:8080/api/carrito/${id}/productos`,)
      .then(data => {
          window.location.replace(data.url);;
      })
};

const HandleCreateCart = () => {
  /* const id= document.getElementById('newCart').value */
    fetch(`http://localhost:8080/api/carrito/`, {method:'POST'})
        .then(response => response.json)
};

const handleAddToCart = () => {
  const id= document.getElementById('addToCart').value // consultar  como tomar el id del cart ?
    fetch(`http://localhost:8080/api/carrito/${id}/productos`, {method:'POST'})
        .then(response => response.json)    
};

const delProd = () => {
    const id= document.getElementById('deletProd').value;
    const prod= document.getElementById('prod').value
    fetch(`http://localhost:8080/api/carrito/${id}/prods/${prod}`, {method:'DELETE'})
        .then(data => {
            window.location.replace(data.url);;
        })
};