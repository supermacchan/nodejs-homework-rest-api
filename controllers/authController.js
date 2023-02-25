const {
    register,
    login
} = require('../services/authService');

const registrationController = async (req, res) => {
    const { email, password } = req.body;
    try {
        await register(email, password);
        res.status(201).json({
            user: {
                email,
                subscription: "starter"
            }
        })
    } catch (err) {
        res.status(400).json(err.message);
    }
    
}

const loginController = async (req, res) => {
    login()
}

module.exports = {
    registrationController,
    loginController
}