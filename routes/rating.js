const express = require('express');
const router = express.Router();

const ratingController = require('../controllers/rating');

const isAuth = require('../middleware/is-auth');

router.get('/rating/:productId', ratingController.getProductRating);

router.post('/rating/:productId', isAuth, ratingController.createProductRating);


module.exports = router;