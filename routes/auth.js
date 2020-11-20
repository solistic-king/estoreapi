const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.put('/signup');
router.post('/login');

module.exports = router;

router.put('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;
