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
const method = {
  method: 'DELETE'
}
const delYd = () => {
  const id= document.getElementById('deletId').value
  fetch(`http://localhost:8080/api/productos/${id}`, 'DELETE',)
      .then(data => {
          window.location.replace(data.url);;
      })
      .then(post => {
          console.log(post.title);
      });
};

const getCart = () => {
  const id= document.getElementById('cartId').value
  fetch(`http://localhost:8080/api/carrito/${id}/productos`,)
      .then(data => {
          window.location.replace(data.url);;
      })
      /* .then(post => {
          console.log(post.title);
      }); */
};

const createCart = () => {
  /* const id= document.getElementById('newCart').value */
  fetch(`http://localhost:8080/api/carrito/`, {method:'POST'})
      .then(response => response.json)
      .then(data => {
          console.log("data fetch post", data);
      });
};

const appProductToCart = () => {
  /* const id= document.getElementById('newCart').value */ // consultar  como tomar el id del cart ?
  fetch(`http://localhost:8080/api/carrito/${id}/productos`, {method:'POST'})
      .then(response => response.json)
      .then(data => {
          console.log("data fetch post", data);
      });
};

const delProd = () => {
  const id= document.getElementById('deletProd').value;
  const prod= document.getElementById('prod').value
  fetch(`http://localhost:8080/api/carrito/${id}/prods/${prod}`, 'DELETE',)
      .then(data => {
          window.location.replace(data.url);;
      })
      .then(post => {
          console.log(post.title);
      });
};