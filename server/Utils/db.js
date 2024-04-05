const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://maneesha:Maneesha12345@database.shcaisl.mongodb.net/?retryWrites=true&w=majority&appName=Database'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('MongoDB connected success'))
.catch((error) => console.log('MongoDB connecting failed', error))

module.exports = mongoose