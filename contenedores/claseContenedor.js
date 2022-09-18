const fs = require('fs');


class Contenedor {
	constructor(/* knex, */ nombreTabla, ruta) {
		/* this.knex = knex */
		this.nombreTabla = nombreTabla
		this.ruta = ruta;
		/* (async() => {
			let exists = await this.knex.schema.hasTable(this.nombreTabla)
			if (!exists) {
					await this.knex.schema.createTable(this.nombreTabla, table => {
							table.increments('id').primary();
							table.string('nombre', 30);
							table.string('categoria', 15);
							table.float('precio', 100);
							table.string('thumbnail',200);
							table.integer('stock')
					});
					console.log('Tabla de productos creada!')
			}
	})() */
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


	async getAll () { 
		return	await this.knex.from(this.nombreTabla).select('*')
		 
	}

	async deleteById (id) { 
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

} 
module.exports = Contenedor