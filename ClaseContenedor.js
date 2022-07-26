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
		}catch (error) { console.log(error)}
	}

	async getById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, 'utf8')
			const dataParsed = JSON.parse(data)
			const searchedProduct = dataParsed.find(prod => prod.id === id)
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
			/* const parsedDataArray = JSON.parse(dataArray, null , 2) */
			const parsedDataArray = await JSON.parse(dataArray)
			if (parsedDataArray.length) {
				console.log(`dataArray en if getAll: ${dataArray}`)
				console.log("Lista de Productos:", parsedDataArray)  
				return parsedDataArray
			} else {
				console.log('no hay productos')
				console.log(`dataArray en else getAll: ${dataArray}`)
		}
		console.log("parsedDataArray getAll fuera del if else", parsedDataArray)
		} catch (error){
			console.log(error)
		}

	}
	async deleteById (id) {  // MAL borra todo
			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
			/* console.log('dataArch de deleteById',dataArch) */
			const dataArchParse = JSON.parse(dataArch) //da error
			/* let dataArchParse = JSON.parse(dataArch) */
			let product = dataArchParse.find(prod => prod.id === id);
			if (product) {
				let dataArchParsefiltered = dataArchParse.filter( prod => prod.id !== id )
				await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParsefiltered, null, 2))
				console.log('producto eliminado')
				// console.log('producto eliminado, froductos filtrados', dataArchParsefiltered ) 
			} else {
				console.log('producto no encontrado')
			}
		
	}

	async deleteAll () {
		await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
				console.log(`array de prod ${this.arrayProductos}`)
	}
}
module.exports = Contenedor