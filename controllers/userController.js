const { updateSubscription } = require('../services/userService');

const updateSubscriptionController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { subscription: subscriptonType } = req.body;
        await updateSubscription(userId, subscriptonType);
        res.status(200).json({
            subscription: subscriptonType
        });
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    updateSubscriptionController
}