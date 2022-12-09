/* import mongoose from 'mongoose' */
const mongoose = require('mongoose')
/* import supertest from 'supertest' */
const {supertest} = require('supertest')
/* import { expect } from 'chai' */
const {expect} = requiere('chai')
import { generar } from './generador/usuarios.js'
const app =require( '../server.js')

let request
let server

describe('test api rest full', () => {

    before(async function () {
        await connectDb()
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/usuarios`)
    })

    after(function () {
        mongoose.disconnect()
        server.close()
    })

    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('debería incorporar un usuario', async () => {
            const producto = generar()
            console.log('Console.log producto para prueba',producto)
            const response = await request.post('/').send(producto)
            expect(response.status).to.eql(200)

            const user = response.body
            expect(user).to.include.keys('nombre', 'email')
            expect(user.nombre).to.eql(producto.nombre)
            expect(user.email).to.eql(producto.email)
        })
    })
})

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost/mibase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos conectada!');
    } catch (error) {
        throw new Error(`Error de conexión en la base de datos: ${err}`)
    }
}

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 8080
        const server = app.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}