const fs = require('fs');
/* const knex = require('knex')(options) */
/* const mariaDB = require('./configDB/config')
const sqlite = require('./configDB/configSqlite')
const knex_mariaDB = require('knex')(mariaDB)
const knex_sqlite = require('knex')(sqlite)   */// creshea nodemon

/* >> Consigna: Tomando como base las clases Contenedor en memoria y en archivos, 
desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases 
de datos, utilizando Knex para la conexión. 
*** Esta clase debe recibir en su constructor el objeto de configuración de Knex y 
el nombre de la tabla sobre la cual trabajará ***. Luego, modificar el desafío entregable de la clase 11”Chat con Websocket”, y:
cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

>> Notas:
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce */




class Contenedor {
	constructor(knex, nombreTabla, ruta) {
		this.knex = knex
		this.nombreTabla = nombreTabla
		this.ruta = ruta;
		(async() => {
			let exists = await this.knex.schema.hasTable(this.nombreTabla)
			/* console.log("exists", exists)
			console.log("knex", knex) */
			if (!exists) {
					await this.knex.schema.createTable(this.nombreTabla, table => {
							table.increments('id').primary();
							table.string('nombre', 30);
							table.float('precio', 100);
							table.string('thumbnail',200);
							table.integer('stock')
					});
					console.log('Tabla de productos creada!')
			}
	})()
	}

	async save(obj) { 
		try {
			return await this.knex(this.nombreTabla).insert(obj)
			/* .then(resp => console.log(resp))
			.catch(err => console.log(err))
			.finally(() => knex.destroy()) */
		}catch (error) {console.log(error)
		}finally {() => knex.destroy()}
	}

	async getById(id) {
    await this.knex.from(this.nombreTabla).select('*').where('id', '=', id).orderBy('id', 'asc')
		.then(resp => console.log(resp))
		.catch(err => console.log(err))
		.finally(() => knex.destroy())

	}


	async getAll () { // FUNCIONA
		return	await this.knex.from(this.nombreTabla).select('*')
		 
	}

	async deleteById (id) { //PENDIENTE
		console.log(`id en deleteNyId ${id}`)
			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
			const dataArchParse = JSON.parse(dataArch) 
			let product = dataArchParse.find(prod => prod.id === id); //con === no anda
			if (product) {
				let dataArchParsefiltered = dataArchParse.filter( prod => prod.id !== id )
				await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParsefiltered, null, 2))
				console.log('producto eliminado')
			} else {
				console.log('producto no encontrado en delete')
			}
	}

	async deleteAll () { // PENDIENTE
		await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
				console.log(`array de prod ${this.arrayProductos}`)
	}

	async updateProduct (producto, id){ //PENDIENTE
		await this.deleteById(id)
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

} 
module.exports = Contenedor