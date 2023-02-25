const express = require('express')
const router = express.Router()

const {
    registrationController,
    loginController
} = require('../../controllers/authController');

router.post('/users/signup', registrationController);
router.post('/users/login', loginController);
 

module.exports = { authRouter: router };