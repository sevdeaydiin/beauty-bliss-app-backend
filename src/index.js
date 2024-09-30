const express = require("express")
const app = express()
require('dotenv').config()
var connectDB = require('./db/mongoose')
connectDB()
const authRouter = require('./routers/auth')
const productRouter = require('./routers/product')
const basketRouter = require('./routers/basket')
const favoriteRouter = require('./routers/favorite')
const orderRouter = require('./routers/order')

app.use(express.json())
app.use(express.static('public'))
const port = process.env.PORT || 4001

app.use(authRouter);
app.use(productRouter);
app.use(basketRouter);
app.use(favoriteRouter)
app.use(orderRouter)

app.listen(port, () => {
    console.log('Server is ' + port)
})