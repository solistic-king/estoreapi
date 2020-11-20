const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')

router.get('/products', shopController.getProducts);

router.post('/products', shopController.createProduct);

router.get('/product/:productId', shopController.getProduct);

router.put('/product/:productId', shopController.updateProduct);

router.delete('/product/:productId', shopController.deleteProduct);

module.exports = router;