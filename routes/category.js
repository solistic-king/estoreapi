const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

const isAuth = require('../middleware/is-auth');

router.get('/categories', categoryController.getCategories);

router.post('/categories', isAuth,  categoryController.createCategory);

router.get('/category/:categoryId', categoryController.getCategory);

router.get('/listByCategory/:categoryId', categoryController.getProductsByCategoryId);

module.exports = router;