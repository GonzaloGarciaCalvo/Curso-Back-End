const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB");

const mongoose =require('mongoose') 
const { Schema } = mongoose;

const carritoSchema= new Schema({
    productos: {type: Object}
},{timestamps: true}) 
const carritos = mongoose.model('carrito', carritoSchema)


class CarritosDaoMongo extends ContenedorMongoDB {
	constructor() {
		super(carritos);

	}

	guardarProducto = async (id, id_prod, obj) => {
		try {
			console.log("id en guardarproducto ", id)
			console.log("id_prod", id_prod)
			console.log("obj en guardarProductos", obj)
			let carrito = await this.getById(id);
			if (carrito) {
				carrito.productos.push(obj);
				await this.modelo.updateOne(
					{ _id: id },
					{ $set: { productos: carrito.productos } }
				);
				return carrito;
			} else {
				return [];
			}
		} catch (error) {
			console.log("GuardarProducto - ocurrio un error: " + error);
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
			await this.modelo.updateOne(
				{ _id: carrito.id },
				{ $set: { productos: productos } }
			);
			return { delete: id_prod };
		} catch (error) {
			console.log("BorrarProductoPorId Ocurrio un error : " + error);
		}
	};
}
module.exports = CarritosDaoMongo
/* export default CarritosDaoMongo */