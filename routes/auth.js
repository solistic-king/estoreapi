const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.put('/auth/signup', authController.signup);

router.post('/auth/login', authController.login);

module.exports = router;
