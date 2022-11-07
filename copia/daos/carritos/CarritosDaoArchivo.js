const ContenedorFirebase = require('../../contenedores/claseContenedor')
const fs = require('fs');

class CarritoDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("carritos.txt"); //  con ../../carritos.txt rompe
	}

	guardarProducto = async (id, id_prod, obj) => {
		try {
			const carritos = await this.getAll()
			let carritoFiltrado = carritos.filter(item =>item.id != id) // llega string
			let carrito = await this.getById(id);
			if (carrito) {
				carrito.productos.push(obj)
				let nuevoCarrito = [ ...carritoFiltrado, carrito]
				await fs.promises.writeFile(this.ruta, JSON.stringify([ 
					...carritoFiltrado , carrito
				], null,2))
				return nuevoCarrito;
			} else {
				return [];
			}
		} catch (error) {
			console.log("guardarProducto - ocurrio un error: " + error);
		}
	};

	ListarProductosPorId = async (id) => {
		try {
			let carrito = await this.getById(id);
			if (carrito) {
				return carrito.productos;
			} else {
				return [];
			}
		} catch (error) {
			console.log("ListarProductosPorId - ocurrio un error: " + error);
		}
	};

	borrarProductoPorId = async (id, id_prod) => {
		try {
			let carrito = await this.getById(id);
			let productos = carrito.productos.filter(
				(producto) => producto.id !== parseInt(id_prod)
			);
			await this.update({ ...carrito, productos: productos });

			return { delete: id_prod };
		} catch (error) {
			console.log("BorrarProductoPorId Ocurrio un error : " + error);
		}
	};
}
module.exports = CarritoDaoFirebase