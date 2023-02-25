const express = require('express')
const router = express.Router()

const {
    registrationController,
    loginController
} = require('../../controllers/authController');

router.post('/signup', registrationController);
router.post('/login', loginController);
 

module.exports = { authRouter: router };