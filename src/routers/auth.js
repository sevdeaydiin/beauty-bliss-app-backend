var express = require('express');

const { 
    register, 
    login,
    allUsers,
    fetchUser
} = require('../controllers/auth');

const auth = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/users').get(allUsers);
router.route('/users/:id').get(fetchUser);

module.exports = router;