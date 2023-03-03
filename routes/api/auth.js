const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve('./public/avatars'));
//     },
//     filename: (req, file, cb) => {
//         const [fileName, extension] =  file.originalname.split('.');
//         cb(null, `${fileName}.${extension}`);
//     }
// })

const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./tmp'));
    },
    filename: (req, file, cb) => {
        const [fileName, extension] =  file.originalname.split('.');
        cb(null, `${fileName}.${extension}`);
    }
})

const initialUploadMiddleware = multer({upload});
// const uploadMiddleware = multer({storage});

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
const { 
    updateSubscriptionController, 
    avatarUploadController 
} = require('../../controllers/userController');

router.post('/signup', credentialsCheckMiddleware, registrationController);
router.post('/login', credentialsCheckMiddleware, loginController);
router.get('/current', authMiddleware, checkCurrentUserController);
router.get('/logout', authMiddleware, logoutController);
router.patch('/', authMiddleware, subscriptionCheckMiddleware, updateSubscriptionController);
router.patch('/avatars', authMiddleware, initialUploadMiddleware.single('avatar'), avatarUploadController);
 

module.exports = { authRouter: router };