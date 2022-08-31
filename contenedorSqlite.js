const fs = require('fs');



class ContenedorSqlite {
	constructor(knex, nombreTabla) {
		this.knex = knex
		this.nombreTabla = nombreTabla,
		(async() => {
			let exists = await this.knex.schema.hasTable(`${this.nombreTabla}`)
			console.log("nombreTable en sqlite", this.nombreTabla)
			console.log("exists en sqlite", exists)
			if (!exists) {
					await this.knex.schema.createTable(this.nombreTabla, table => {
						table.string('mensaje', 500);
						table.string('id',20)
            table.string('date',25)
					});
					console.log('Tabla de mensajes creada en sqlite')
			}
	})()
	}

	// async saveMessege(obj) { // SQLITE_MISMATCH: datatype mismatch]
	// 	const seveChat = await this.knex(this.nombreTabla).insert(obj)
	// 	console.log("en saveMessege")
	// 	.then(resp => console.log(resp))
	// 	.catch(err => console.log(err))
	// 	.finally(() => knex.destroy())
	// 	return seveChat
	// }

/* 	async deleteAll () {
		await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
				console.log(`array de prod ${this.arrayProductos}`)
	} */

	async getMesseges () { 
		try {
			console.log("getMesseges")
			return await this.knex.from(this.nombreTabla).select('*')

		} catch {(err => console.log(err))}
  }
				
	async saveMessage(obj) {  // NO FUNCIONA
		try {
			console.log("obj mensaje  ",obj) //llega 
			const knex = this.knex
			/* const insertedObj = await knex(this.nombreTabla).insert(obj)  *///no incerta
      /* console.log("indertedObject  ", insertedObj) */
			return await knex(this.nombreTabla).insert(obj) //no incerta
		}	catch {
			err => console.log(err)
		} finally {
			() => knex.destroy()
		}
} 

}
module.exports = ContenedorSqlite