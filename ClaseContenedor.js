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
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id:dataArchParse.length+1 } ],null,2))
			} else {
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...obj, id:dataArchParse.length+1}],null,2))
			}
			console.log(`El objeto tiene id: ${dataArchParse.length+1}`) 
			return dataArchParse.length+1
		}catch (error) { console.log(error)}
	}

	async getById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, 'utf8')
			const dataParsed = JSON.parse(data)
			console.log("dataParsed en getById: ", dataParsed) //muestra array con objeto cart id=1
			const numId = Number(id) // fix al find
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

	async updateItem (producto, id){ 
		await this.deleteById(id)
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}
	async saveCart(prod) { 
		try {
			let id 
			const cart = {
			id: id ,
			timestamp : Date.now(),
			productos: prod
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
	
}
module.exports = Contenedor