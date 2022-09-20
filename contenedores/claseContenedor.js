// const fs = require('fs');


// class Contenedor {
// 	constructor(/* knex, */ nombreTabla, ruta) {
// 		/* this.knex = knex */
// 		this.nombreTabla = nombreTabla
// 		this.ruta = ruta;
// 		/* (async() => {
// 			let exists = await this.knex.schema.hasTable(this.nombreTabla)
// 			if (!exists) {
// 					await this.knex.schema.createTable(this.nombreTabla, table => {
// 							table.increments('id').primary();
// 							table.string('nombre', 30);
// 							table.string('categoria', 15);
// 							table.float('precio', 100);
// 							table.string('thumbnail',200);
// 							table.integer('stock')
// 					});
// 					console.log('Tabla de productos creada!')
// 			}
// 	})() */
// 	}

// 	async save(obj) { 
// 		try {
// 			return await this.knex(this.nombreTabla).insert(obj)
// 			/* .then(resp => console.log(resp))
// 			.catch(err => console.log(err))
// 			.finally(() => knex.destroy()) */
// 		}catch (error) {console.log(error)
// 		}finally {() => knex.destroy()}
// 	}

// 	async getById(id) {
//     await this.knex.from(this.nombreTabla).select('*').where('id', '=', id).orderBy('id', 'asc')
// 		.then(resp => console.log(resp))
// 		.catch(err => console.log(err))
// 		.finally(() => knex.destroy())

// 	}


// 	async getAll () { 
// 		return	await this.knex.from(this.nombreTabla).select('*')
		 
// 	}

// 	async deleteById (id) { 
// 		console.log(`id en deleteNyId ${id}`)
// 			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
// 			const dataArchParse = JSON.parse(dataArch) 
// 			let product = dataArchParse.find(prod => prod.id === id); //con === no anda
// 			if (product) {
// 				let dataArchParsefiltered = dataArchParse.filter( prod => prod.id !== id )
// 				await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParsefiltered, null, 2))
// 				console.log('producto eliminado')
// 			} else {
// 				console.log('producto no encontrado en delete')
// 			}
// 	}

// 	async deleteAll () { 
// 		await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
// 				console.log(`array de prod ${this.arrayProductos}`)
// 	}

// 	async updateProduct (producto, id){ 
// 		await this.deleteById(id)
// 		const itemToModify = { ...producto, ...id} 
// 		let products = await this.getAll()
// 		products = [...products , itemToModify]
// 		const orderedProducts = products.sort((a,b)=>a.id-b.id)
// 		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
// 	}

// } 
// module.exports = Contenedor

const fs = require('fs');

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta
	}
	async save(obj) { 
		try {
			let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchParse = JSON.parse(dataArch)
			if (dataArchParse) {
				await fs.promises.writeFile(this.ruta, JSON.stringify(
					[...dataArchParse, { ...obj, id:dataArchParse.length+1, timestamp: Date.now()} ],null,2))
			} else {
				await fs.promises.writeFile(this.ruta, JSON.stringify(
					[...dataArchParse, {...obj, id:dataArchParse.length+1,timestamp: Date.now() }],null,2))
			}
			console.log(`El objeto tiene id: ${dataArchParse.length+1}`) 
			return dataArchParse.length+1
		}catch (error) { console.log(error)}
	}
  
	async saveInCart(obj, id) {  //NO FUNCIONA
		try {
			let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchParse = JSON.parse(dataArch)
			if (dataArchParse) {
				await this.deleteById(id)
				await fs.promises.writeFile(this.ruta, JSON.stringify({ ...dataArchParse, obj})
				)
			return dataArchParse.length+1
		} 
	}catch (error) { console.log(error)}
  }

	async lastCart() { 
		//tomo el ultimo cart
		/* const dataArch = await fs.promises.readFile(this.ruta, 'utf-8') */
		
		try {
			const dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
			console.log("dataArch lastCart ",dataArch)
			const dataArchParse = await JSON.parse(dataArch) //intento obtener parseado el ultimo elemento del array archivo
			console.log("dataArch.Parse lastCart ",dataArchParse)
			const cartPosition = dataArchParse.length //id coincide con length
      console.log("cartPosition", cartPosition)//ok
			const cartSelected = dataArchParse[cartPosition-1] //ok
			console.log("cartSelected ",cartSelected)
			
			return cartPosition
		}catch (error) { console.log(error)}
	}

	async getById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, 'utf8')
			const dataParsed = JSON.parse(data)
			const numId = Number(id) 
			const searchedProduct = dataParsed.find(prod => prod.id === numId)
			if (searchedProduct) {
				console.log (`El producto con id ${id} es ${JSON.stringify(searchedProduct, null, 2)}`)
				return searchedProduct
			} else {
				console.log(`Producto no encontrado`)
				return null
			}
		}
		catch (error) { console.log(error)}
	}
	async getAll () { 
		try {
			const dataArray = await fs.promises.readFile(this.ruta, 'utf8')
			const parsedDataArray = await JSON.parse(dataArray, null , 2)
			if (parsedDataArray.length) { 
				return parsedDataArray
			} else {
				console.log('no hay productos')
		  }
		} catch (error){
			console.log(error)
		}

	}
	async deleteById (id) { 
		console.log(`id en deleteNyId ${id}`)
			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
			console.log("dataArch en deleteById",dataArch)
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

	async update (producto, id){ 
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		await this.deleteById(id)
		const filteredCart = products.filter(prod => prod.id !== id)
		filteredCart = [...filteredCart , itemToModify]
		const orderedProducts = filteredCart.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

	async updateCart (producto, id){ 
		
		const itemToModify = { ...producto} 
		let products = await this.getAll()
		console.log("cart antes de deleteAll  ", products)
		await this.deleteAll()
		const chequeoArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
		console.log("che ", chequeoArchivo) 
		const productsFiltered = products.filter(item => item.id !==producto.id)
		console.log("pf", productsFiltered) 
		products = [...productsFiltered , itemToModify]
		const orderedProducts = products.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

	async saveCart(prod) { 
		try {
			let id 
		
			const cart = {
			id: id ,
			timestamp : Date.now(),
			productos: []
		}
			let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchParse = JSON.parse(dataArch)
			if (dataArchParse) {
				console.log("dataParse.length", dataArchParse.length)
				cart.id = dataArchParse.length + 1
				console.log("cart", cart)
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {id:cart.id, timestamp:cart.timestamp, productos:cart.productos} ],null,2))
			} else {
				cart.id = 1;
				console.log("en else saveCart")
				await fs.promises.writeFile(this.ruta, JSON.stringify([{id:cart.id, timestamp:cart.timestamp, productos:cart.productos}],null,2))
			}
			console.log(`El objeto tiene id: ${dataArchParse.length+1}`) 
			return dataArchParse.length+1
		}catch (error) { console.log(error)}
	}

	async deletProd(cartId, prodId) {
		try {
				const cartSelected = await this.getById(cartId);
				console.log("data", cartSelected)
				const arrayProd = await cartSelected.productos
				console.log("arrayProd", arrayProd)
				const cart = await this.getAll() 
				const cartProd = cartSelected.productos
				console.log("cartProd", cartProd)
				console.log("type of ", typeof cartProd)
				const cartProdFiltered = cartProd.filter(item => item.id !=prodId) 
				console.log("cartProdFiltered", cartProdFiltered)
				const cartFiltered = cart.filter(item => item.id != cartId)
				cartSelected.productos = cartProdFiltered
				const newCartArray = [...cartFiltered, cartSelected]

				const asd = await this.deleteAll()  

				const newCartArraySaved = fs.promises.writeFile(this.ruta, JSON.stringify(newCartArray),null,2);
				return newCartArraySaved 
		} catch (error) {
				return console.log(error)
		}
}
	
}
module.exports = Contenedor