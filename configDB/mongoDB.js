/* mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/test */ // compass
//mongodb+srv://garciacalvog:yJrrTE4mcwui4Ed@cluster0.k3ncstn.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose')

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

module.exports = connectDB