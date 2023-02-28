const express = require('express')
const router = express.Router()
const { 
    authMiddleware,
    credentialsCheckMiddleware
 } = require('../../middleware/authMiddleware');
const {
    registrationController,
    loginController,
    checkCurrentUserController
} = require('../../controllers/authController');

router.post('/signup', credentialsCheckMiddleware, registrationController);
router.post('/login', credentialsCheckMiddleware, loginController);
router.get('/current', authMiddleware, checkCurrentUserController);
 

module.exports = { authRouter: router };