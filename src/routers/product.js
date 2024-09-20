var express = require('express');
const multer = require('multer')

const { 
    postProduct, 
    getProduct,
    uploadImage,
    getImage,
    fetchProductById,
    //fetchUser
} = require('../controllers/product');

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 100000000
    }
})

router.route('/product').post(postProduct);
router.route('/product').get(getProduct);
router.route('/uploadImage/:id').post(upload.single('upload'), uploadImage);
router.route("/product/:id/image").get(getImage)
router.route('/product/:id').get(fetchProductById);
//router.route('/users/:id').get(fetchUser);

module.exports = router;