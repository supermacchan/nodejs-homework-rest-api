const {
    register,
    login,
    checkCurrentUser,
    logout,
    verification,
    resendVerification
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
        console.log(err);
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

const logoutController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        await logout(userId);
        res.status(204).json("No content");
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

const verificationController = async (req, res) => {
    const { verificationToken } = req.params;
    try {
        await verification(verificationToken);
        res.status(200).json("Verification successful");
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

const resendVerificationController = async (req, res) => {
    try {
        const { email } = req.body;
    
        await resendVerification(email);
        res.status(200).json("Verification email sent");
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    checkCurrentUserController,
    verificationController,
    resendVerificationController
}