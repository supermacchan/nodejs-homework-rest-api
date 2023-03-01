const express = require('express')
const router = express.Router()

const { 
    authMiddleware,
    credentialsCheckMiddleware
 } = require('../../middleware/authMiddleware');
const { subscriptionCheckMiddleware } = require('../../middleware/userMiddleware');
const {
    registrationController,
    loginController,
    logoutController,
    checkCurrentUserController,
} = require('../../controllers/authController');
const { updateSubscriptionController } = require('../../controllers/userController');

router.post('/signup', credentialsCheckMiddleware, registrationController);
router.post('/login', credentialsCheckMiddleware, loginController);
router.get('/current', authMiddleware, checkCurrentUserController);
router.get('/logout', authMiddleware, logoutController);
router.patch('/', authMiddleware, subscriptionCheckMiddleware, updateSubscriptionController)
 

module.exports = { authRouter: router };