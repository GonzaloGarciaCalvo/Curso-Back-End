// const fs = require('fs');



// class ContenedorSqlite {
// 	constructor(knex, nombreTabla) {
// 		this.knex = knex
// 		this.nombreTabla = nombreTabla,
// 		(async() => {
// 			let exists = await this.knex.schema.hasTable(`${this.nombreTabla}`)
// /* 			console.log("nombreTable en sqlite", this.nombreTabla)
// 			console.log("exists en sqlite", exists) */
// 			if (!exists) {
// 					await this.knex.schema.createTable(this.nombreTabla, table => {
// 						table.increments('id',50).primary();
// 						table.string('correo',20)
// 						table.string('mensaje', 500);
//             table.string('date',25)
// 					});
// 					console.log('Tabla de mensajes creada en sqlite')
// 			}
// 	})()
// 	}

// 	async getMesseges () { 
// 		try {
// 			console.log("getMesseges")
// 			return await this.knex.from(this.nombreTabla).select('*')

// 		} catch (error){console.log(error)}
//   }
				
// 	async saveMessage(obj) {  // NO FUNCIONA
// 		try {
// 			console.log("obj mensaje en saveMessage ",obj) //llega 
// 			/* await console.log("entrada a db",this.knex(this.nombreTabla).insert(obj))  */ // muestra objeto queryBuilder
// 			console.log("nombre tabla", this.nombreTabla)
// 			console.log("MARCAAAA")   // NO SE EJECUTA
// 			return await this.knex(this.nombreTabla).insert(obj)
// 		}	catch (error) {
// 			console.log(error)
// 		} finally {
// 			() => knex.destroy()
// 		}
// } 

// }
// module.exports = ContenedorSqlite