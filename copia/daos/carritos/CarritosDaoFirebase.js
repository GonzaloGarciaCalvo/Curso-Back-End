const ContenedorFirebase = require('../../contenedores/contenedorFirebase')
/* import { carritosDao } from ".."
import ContenedorFirebase from "../../contenedores/contenedorFirebase" */

/* const firebase = require('firebase-admin')
const db = firebase.firestore();
const cart = db.collection("carritos"); */

class CarritoDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("carritos");
	}

	guardarProducto = async (id, id_prod, obj) => {
		try {
			let carrito = await this.getById(id);
			console.log("carrito en guardarProductos ", carrito)// ok
			if (carrito) {
				carrito.productos.push(obj);
				console.log("carrito.productos ", carrito.productos)
				await this.save(carrito); //rompe
				console.log("carrito en guardar ", carrito) //no llega
				return carrito;
			} else {
				return [];
			}
		} catch (error) {
			console.log("guardarProducto - error: " + error);
		}
	};

	ListarProductosPorId = async (id) => {
		try {
			let carrito = await this.getById(id);
			if (carrito) {
				if (carrito.productos) {
					return carrito.productos;
				} else {
					return [];
				}
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
				(producto) => producto.id !== id_prod
			);
			carrito.productos = productos;
			await this.update(carrito);
			return { delete: id_prod };
		} catch (error) {
			console.log("BorrarProductoPorId Ocurrio un error : " + error);
		}
	};
}
module.exports = CarritoDaoFirebase
/* export default CarritoDaoFirebase */