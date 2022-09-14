const admin = require("firebase-admin");

const serviceAccount = require("path/to/serviceAccountKey.json"); //ruta al archivo json de claves

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
/* 
const firebase = require('firebase-admin')*/
const db = admin.firestore();
/* const cart = db.collection("carritos");  */


class ContenedorFirebase {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    async getAll() {
        try {
            const querySnapshot = await this.url.get();
            const docs = querySnapshot.docs;
            const collection = docs.map(doc => {
                return {...doc.data(), id: doc.id }      
            });
            return collection
        } catch (error) {
            console.log(error)
        }
    }
    
    async getById(id) {
        try {
            const doc = this.url.doc(id)
            const result = await doc.get()
            const data = result.data()
            return {...data, id}
        } catch (error) {
            console.log(error)
        }
    }


    async insert(newDoc) {
        try {
            const doc= this.url.doc();
            const insert = await doc.create({...newDoc})
            return insert
        } catch (error) {
            console.log(error)
            
        }
    }

    async actualizar(id, newDoc) {
        const doc = this.url.doc(id)
        const result = await doc.update({...newDoc});
        return result
    }

    async eliminar(id) {
        const doc = this.collection.doc(id);
        const result = await doc.delete()
        return result
    }
}

module.exports = ContenedorFirebase