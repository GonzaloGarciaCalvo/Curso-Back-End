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
				await fs.promises.writeFile(this.ruta, JSON.stringify({ ...dataArchParse, obj}))
			return dataArchParse.length+1
		} 
	}catch (error) { console.log(error)}
  }

	async lastCart() { 
		
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
		/* console.log(`id en deleteById ${id}`) */
		console.log("id en deleteById  ",id)
			const dataArch = await fs.promises.readFile(this.ruta, 'utf8');
			console.log("dataArch en deleteById",dataArch)
			const dataArchParse = JSON.parse(dataArch) 
			let product = dataArchParse.find(prod => prod.id === id); //con === no anda
			console.log("product en deleteById", product)
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
		console.log("id en update ", id)
		const itemToModify = { ...producto, ...id} 
		let products = await this.getAll()
		await this.deleteById(id)
		let filteredProducts = products.filter(prod => prod.id !== id)
		filteredProducts = [...filteredProducts , itemToModify]
		const orderedProducts = filteredProducts.sort((a,b)=>a.id-b.id)
		await fs.promises.writeFile(this.ruta, JSON.stringify(orderedProducts,null,2))  
	}

	/* async update(obj){
		try {
				let datos = await this.getAll();
				let nuevosDatos = datos.map(el => el.id === obj.id? obj : el);
				await fs.promises.writeFile(this.archivo,JSON.stringify(nuevosDatos, null, 2));
				return obj.id
		} catch (error) {
				console.log('update - ocurrio un error:' + error);
		}
} */

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