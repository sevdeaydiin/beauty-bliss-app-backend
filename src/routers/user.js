var express = require('express');

const { 
    profilePicture, 
} = require('../controllers/user');

//const auth = require('../middleware/auth');

const router = express.Router();

router.route('/:id/avatar').get(profilePicture);

module.exports = router;