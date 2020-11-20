const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/products', shopController.getProducts);

router.post('/products', isAuth,  shopController.createProduct);

router.get('/product/:productId', shopController.getProduct);

router.put('/product/:productId', isAuth, shopController.updateProduct);

router.delete('/product/:productId', isAuth, shopController.deleteProduct);

router.get('/me', isAuth, userController.me);

module.exports = router;