const {
    register,
    login
} = require('../services/authService');

const registrationController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await register(email, password);
        if (!user) {
            return res.status(409).json("Email in use");
        }

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
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        if (!token) {
            return res.status(401).json("Email or password is wrong");
        }
        res.status(200).json({
            token,
            user: {
                email,
                subscription: "starter"
            }
        })
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    registrationController,
    loginController
}