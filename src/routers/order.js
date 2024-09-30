var express = require('express')

const {
    addOrder,
    getOrder,
    //updateBasket,
    //deleteBasket
} = require('../controllers/order')

const router = express.Router()
const auth = require('../middleware/auth')

router.route('/order/:id').post(auth, addOrder)
router.route('/order/:id').get(auth, getOrder)
//router.route('/basket/:id').put(auth, updateBasket)
//router.route('/basket/:id').delete(auth, deleteBasket)

module.exports = router