const { User } = require('../db/usersModel');
const {
    register,
    login,
    checkCurrentUser
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
        res.status(err.status).json(err.message);
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, userId } = await login(email, password);
        // ВЫНЕСТИ В СЕРВИС
        const user = await User.findOneAndUpdate(
            userId,
            { $set: { token } }
        )

        res.status(200).json({
            token,
            user: {
                email,
                subscription: user.subscription,
            }
        })
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

const checkCurrentUserController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const user = await checkCurrentUser(userId);
        res.status(200).json({
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    registrationController,
    loginController,
    checkCurrentUserController
}