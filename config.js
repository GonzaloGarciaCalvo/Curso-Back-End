
import mongoose from 'mongoose'
/* const mongoose = require('mongoose') */

const connectDB = async () => {
    try {
        const url = 'mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test'
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}
export {connectDB}
/* module.exports = connectDB */


  firebase={
    "type": "service_account",
    "project_id": "cursobackend-ggc",
    "private_key_id": "4e382147cbf010d514f6f6c1da270c8598b7f851",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCY2dK+OPE32iZA\nPKZMI7L5nEngV/FhRAJY5u0xy/YkBzvuLQ4DUQOiwQvTDkTqo3Aq7YVTd3d43eAQ\nCjYyccKEy1GDa5uWIarbCBLQvLcen9IgbTchQwWY1wFr35mrqtRyjm8QMP3LWNro\ncGdSmpxBluHnGbU8Ms3Nab0qH4L9P/GIHR7SpVU5fx1Ao3Q0g5EJvrWm6T3LFfGg\nx9R8KExKD1PgIHMYwABN5BlCtrPmaz0L25cQWuksyFPwYbOsFcP8iNtgQwuOO+Lz\nInK9uKIGGXZw5x5s1iTrVFynmddkY5w9pspVwHskwp9vb5Mzyy48FCjsLLt+I4m7\n+0Pavwe1AgMBAAECggEAB3QRuHhm3NIcrOO4OTzBaLYUDSZErTlHgwXJubSoLUQU\nCk50oTlFW92dgb5vomBzYwh/iJ0p/IEXQLj6wRV2hoqykB3Ccbz1C6a2YirdpBbn\nhHDG8C6IOpZ7aYL3B522K9rhtBCrg4uy6wQ2KZtD9NfSbrY8dfHFQte942yzcr1k\n8nPwNy4HXKV6ue1WFbX+UaN5JfMYm854oOFZnvkJ3n3iTXvTfCtrPNCwIBrsSUGm\nCQ1ms37WUrsxcteHh3nvUtwPi5D54GKFO/kWWDDCte39a4MY0Z9DhnvbXx02h7sh\nD0OkDO5xkAaOwnnCuAb9KyCQgRWYvdKsBJoyQItCSQKBgQDJYz1/c7aZFccRR3G3\n/CEOkTaJ4BggWtNh/BHA0uzmfWFcWs8VD3pFkgw1S25fTKA8OwEkYlymF2HBqMnr\nuYBtja0Y2Dsf/Fp3F7kZUC7dQm2FL1l487idVaw8tK6O5+VOu9QVQk40QLTY0UHg\n0hddRb1u61rnwM6psu816z6nLQKBgQDCTQ5Z45v2Lr8L1zlias411qdPNbl/vKKS\n5kzRIHpGGFHcalTqH2OyWAlmp/QMFxCIPVesi3bbUf/18wCXLq+g6IyfVZ9OSsY8\nVaDMLZW2Xri2Hgt3jfn4eYdfdJ/kN7WSquGumgFtccrdOanTe4pD8hgxaO4J255i\nr9n6xVg3qQKBgQCx64dtjqGH5gGVdnU1gv8Bi7GPZfhqvVN7geN9Y9wAVk0p9uB1\nTtNLm5hFjXrZny0BiW+c4XnRE18+ZQzfwWeBYmXHSWITBDQ4ezEA+CIvQHzZ6dc2\nULyN5B7jEw4VGzMvuCnLDmVhLLmZxGZbZcFWmkKeODh7/4+VxYwpKsiTkQKBgQCY\nJq8uRMZEqaaBJzCQmQKRtl2d8XwpQxYr4pwUx1H4weKYr8t+6sWvSrFR6gN51DXl\n+eNGApA4fqXpezjjKnPtlS1JOEtfi75gUM1yFeA+xz3tnulr3Yn5wXD4luL+W4Gc\nMKQ5je/APHOXeSg7q2pCernnNzvwDEKjFQGlFhRWwQKBgGWiai+iJRa5q1ukdxZs\nWgjjD67g3PGfUJloRWsibnEXFUaJUb8ai2G8GFx0v0wsVb0RepwTP3zAhALZ3r2/\nDw7VmFEwBNGL3D+Wb2I8+gjlP9X10TREB2SgZPcNIes/W767AKZzIc/AUjWjTF0t\nyPp6Nx8hcVBEhZG3ap90xdLw\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-lclxz@cursobackend-ggc.iam.gserviceaccount.com",
    "client_id": "109793861735730892233",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lclxz%40cursobackend-ggc.iam.gserviceaccount.com"
  }

