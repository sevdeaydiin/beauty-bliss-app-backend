var express = require('express')

const {
    addFavorite,
    getFavorite,
    deleteFavorite
} = require('../controllers/favorite')

const router = express.Router()
const auth = require('../middleware/auth')

router.route('/favorite').post(auth, addFavorite)
router.route('/favorite/:id').get(auth, getFavorite)
router.route('/favorite/:id').put(auth, deleteFavorite)

module.exports = router