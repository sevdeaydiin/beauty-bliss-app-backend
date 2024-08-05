const express = require("express")
const app = express()
require('dotenv').config()
var connectDB = require('./db/mongoose')
connectDB()
const authRouter = require('./routers/auth')

app.use(express.json())
app.use(express.static('public'))
const port = process.env.PORT || 4000

app.use(authRouter)

app.listen(port, () => {
    console.log('Server is ' + port)
})