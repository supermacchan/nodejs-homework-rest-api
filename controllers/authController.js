const {
    register,
    login,
    checkCurrentUser,
    logout
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
        const { token, updatedUser} = await login(email, password);

        res.status(200).json({
            token,
            user: {
                email,
                subscription: updatedUser.subscription,
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

const logoutController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        await logout(userId);
        res.status(204).json("No content");
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    registrationController,
    loginController,
    checkCurrentUserController,
    logoutController
}