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
			const searchedProduct = dataParsed.find(prod => prod.id === id)
			console.log("searchedProduct: ", searchedProduct) 
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
				console.log('no hay productos - getAll')
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

	async updateProduct (producto, id){ 
		await this.deleteById(id)
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

	async getMesseges () { 
		try {
			const dataArray = await fs.promises.readFile(this.ruta, 'utf8')
			 const parsedDataArray = await JSON.parse(dataArray, null , 2)
				/* console.log(" length getMesseges", parsedDataArray.length) */
				return parsedDataArray
		} catch (error){
			console.log(error)
		}
	}
	async saveMessege(obj) {
		/* console.log("obj en saveM", obj) */
		/* const data = await this.getAll(); */
		let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
		let dataArchParse = JSON.parse(dataArch)
			await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj} ],null,2))

} 

	//otra prueba
    // Agrega producto pero no reemplaza
	 /* async updateProduct (producto, id){ // Falta probar !!
		let itemToModify = await this.getById(id)
		itemToModify = {
			nombre: producto.nombre,
			categoria: producto.categoria,
			thumbnail: producto.thumbnail,
			precio: producto.precio,
			id:id
		} 
		await this.deleteById(id)
		let products = await this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a-b)
		await fs.promises.writeFile(this.ruta, JSON.stringify([...orderedProducts],null,2))    
	} */
}
module.exports = Contenedor