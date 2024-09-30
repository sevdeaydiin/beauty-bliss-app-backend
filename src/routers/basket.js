var express = require('express')

const {
    addBasket,
    getBasket,
    updateBasket,
    deleteBasket
} = require('../controllers/basket')

const router = express.Router()
const auth = require('../middleware/auth')

router.route('/basket/:id').post(auth, addBasket)
router.route('/basket/:id').get(auth, getBasket)
router.route('/basket/:id').put(auth, updateBasket)
router.route('/basket/:id').delete(auth, deleteBasket)

module.exports = router