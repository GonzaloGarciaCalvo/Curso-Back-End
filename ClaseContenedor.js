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
	constructor(ruta, knex, nombreTabla) {
		this.ruta = ruta
		this.knex = knex
		this.nombreTabla = nombreTabla
	}

	async createTable (nombreTabla){
			try {
					await knex.schema.createTable(nombreTabla, table =>{
							table.increments('id').primary()
							table.string('nombre',20)
							table.float('precio',50) 
							table.string('thumbnail',30)  
							table.integer('stock')
					})
					console.log('Tabla creada')
			} catch (error) {
					console.log(error)
			} 
			
	}

	async save(obj) { 
		try {
			await this.knex(nombreTabla).insert(obj)
			/* .then(resp => console.log(resp))
			.catch(err => console.log(err))
			.finally(() => knex.destroy()) */
		}catch (error) {console.log(error)
		}finally {() => knex.destroy()}
	}

	async getById(id) {
	
		try {
      const itemSelected = this.knex.from(nombreTabla).select('*').where('id', '=', id)
			if (itemSelected) {
				console.log (`El producto con id ${id} es ${JSON.stringify(itemSelected, null, 2)}`)
				return itemSelected
			} else {
				console.log(`Producto no encontrado`)
				return null
			}
		}catch {
      err => console.log(err)
		}finally {
      () => this.knex.destroy()
		}
	}


	async getAll () { //falta
		/* try {
			const dataArray = await fs.promises.readFile(this.ruta, 'utf8')
			const parsedDataArray = await JSON.parse(dataArray, null , 2)
			if (parsedDataArray.length) { 
				return parsedDataArray
			} else {
				console.log('no hay productos - getAll')
		  }
		} catch (error){
			console.log(error)
		} */
    try {
			knex.from(this.nombreTabla).select('*')
					.then(resp => {
							for(obj of resp){
									console.log(`El id: ${obj.id} es un ${obj.name} y cuesta ${obj.price}`)
							}
					})
					
		} catch {
			(err => console.log(err))
		}
			


	}
	async deleteById (id) { //falta
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

	async deleteAll () {
		await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
				console.log(`array de prod ${this.arrayProductos}`)
	}

	async updateProduct (producto, id){ 
		await this.deleteById(id)
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

	async getMesseges () { 
		// try {
		// 	const dataArray = await fs.promises.readFile(this.ruta, 'utf8')
		// 	 const parsedDataArray = await JSON.parse(dataArray, null , 2)
		// 		/* console.log(" length getMesseges", parsedDataArray.length) */
		// 		return parsedDataArray
		// } catch (error){
		// 	console.log(error)
		// }

    knex.from(nombreTabla).select('*')
				.then(resp => {
						for(obj of resp){
								console.log(`El id: ${obj.correo} es un ${obj.mensaje}, ${obj.id}, ${obj.date}`)
						}
})
.catch(err => console.log(err))

	}
	async saveMessege(obj) {  // FALTA
		/* let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
		let dataArchParse = JSON.parse(dataArch)
			await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj} ],null,2)) */
		try {
			await knex('cars').insert(arrayCars)

		}	catch {
			err => console.log(err)
		} finally {
			() => knex.destroy()
		}
			/* .then(resp => console.log(resp)) */

} 

	
}
module.exports = Contenedor