const handlegetById = () => {
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

const handleCreateCart = () => {
  /* const id= document.getElementById('newCart').value */
    fetch(`http://localhost:8080/api/carrito/`, {method:'POST'})
        .then(response => response.json)
};

const handleAddToCart = () => {
  const id= document.getElementById('addToCart').value // consultar  como tomar el id del cart ?
    fetch(`http://localhost:8080/api/carrito/${id}/productos`, {method:'POST'})
        .then(response => response.json)    
};

const handleDeleteProd = () => {
    const id= document.getElementById('deleteProd_id').value;
    const id_prod= document.getElementById('deleteProd_prodId').value
    fetch(`http://localhost:8080/api/carrito/${id}/productos/${id_prod}`, {method:'DELETE'})
        .then(response => response.json)    
};