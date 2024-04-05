const express = require('express')
const cors = require('cors')
const router = require('./Routers/index')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', router)

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server run with ${PORT} - port`);
})