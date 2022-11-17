const admin = require("firebase-admin");
/* const path = "../configDB/firebaseDB.json" */
const serviceAccount = require("../configDB/firebaseDB.json"); //ruta al archivo json de claves
/* console.log("serviceAccount, ", serviceAccount) */ //llega


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
/* 
const firebase = require('firebase-admin')*/
const db = admin.firestore();
/* const cart = db.collection("carritos");  */


class ContenedorFirebase {
	constructor(collectionName) {
		this.collection = db.collection(collectionName);
	}

	async getAll() {
		try {
			const querySnapshot = await this.collection.get();
			const docs = querySnapshot.docs;
			const collection = docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			return collection;
		} catch (error) {
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const doc = this.collection.doc(id);
			const result = await doc.get();
			const data = result.data();
			return { ...data, id };
		} catch (error) {
			console.log(error);
		}
	}

	async save(newDoc) {
		try {
			console.log("en save");
			const doc = this.collection.doc();
			const insert = await doc.create({ ...newDoc });
			console.log("indert en save", insert)
			return insert;
		} catch (error) {
			console.log(error);
		}
	}

	/* async update(id, newDoc) {
        const doc = this.collection.doc(id)
        const result = await doc.update({...newDoc});
        return result
    } */
	async update(obj, id) {
		try {
					console.log("id en update firebase ", id)
					console.log("obj en update ", obj)// llega id
					console.log("obj.id ", obj.id, " tipo ", typeof(obj.id))
					const doc = this.collection.doc(obj.id) // 
					console.log('doc en update ', doc) // 
					await doc.update(obj);
					return obj.id;
		} catch (error) {
			console.log("update - error:" + error);
		}
	}

	async deleteById(id) {
		const doc = this.collection.doc(id);
		const result = await doc.delete();
		return result;
	}
}

module.exports = ContenedorFirebase