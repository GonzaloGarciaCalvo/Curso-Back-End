const fs = require('fs');

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta
	}
	async save(obj) { 
		let aux =[]
		try {
			let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchParse = JSON.parse(dataArch)
			if (dataArchParse) {
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id:dataArchParse.length+1 } ],null,2))
			} else {
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...obj, id:dataArchParse.length+1}],null,2))
			}
			aux=dataArchParse
			console.log(`El objeto tiene id: ${dataArchParse.length+1}`) 
			return dataArchParse.length+1
		}catch (error) { console.log(error)}
	}

	async getById(id) {
		try {
			//console.log('id en metodo', id) //entra con el id de params
			const data = await fs.promises.readFile(this.ruta, 'utf8')
			const dataParsed = JSON.parse(data)
			//console.log("dataParsed: ", dataParsed) //lo muestra bien
			const searchedProduct = dataParsed.find(prod => prod.id === id)
			console.log("searchedProduct: ", searchedProduct) //undefined
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
				/* console.log(`dataArray en if getAll: ${dataArray}`) */
				console.log("Lista de Productos:", parsedDataArray)  
				return parsedDataArray
			} else {
				console.log('no hay productos')
				/* console.log(`dataArray en else getAll: ${dataArray}`) */
		  }
		console.log("parsedDataArray getAll fuera del if else", parsedDataArray)
		} catch (error){
			console.log(error)
		}

	}
	async deleteById (id) { 
			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
			const dataArchParse = JSON.parse(dataArch) 
			let product = dataArchParse.find(prod => prod.id === id);
			console.log("prod en deleteById id: ", product.id)
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

	async updateProduct (producto, id){ // Falta probar !!
		const itemToModify = this.getById(id)
		itemToModify = {
			nombre: producto.nombre || nombre,
			categoria: producto.categoria || categoria,
			thumbnail: producto.thumbnail || thumbnail,
			id
		}
		this.deleteById(id)
		const products = this.getAll()
		products = [...products , itemToModify]
		const orderedProducts = products.sort((a,b)=>a-b)
		await fs.promises.writeFile(this.ruta, JSON.stringify([...orderedProducts],null,2))    
	}
}
module.exports = Contenedor