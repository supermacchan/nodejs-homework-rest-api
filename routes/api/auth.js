const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../../middleware/authMiddleware');
const {
    registrationController,
    loginController,
    checkCurrentUserController
} = require('../../controllers/authController');

router.post('/signup', registrationController);
router.post('/login', loginController);
router.get('/current', authMiddleware, checkCurrentUserController);
 

module.exports = { authRouter: router };