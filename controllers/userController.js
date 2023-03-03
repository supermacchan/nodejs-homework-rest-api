const { 
    updateSubscription,
    updateAvatar
 } = require('../services/userService');
const { imageResizingMiddleware } = require('../middleware/imageResizingMiddleware');

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

const avatarUploadController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const [fileName, extension] =  req.file.filename.split('.');
        const filePath = `./tmp/${fileName}.${extension}`;

        const newFileLocation = await imageResizingMiddleware(filePath, extension);
        const updatedUser = await updateAvatar(userId, newFileLocation);

        res.status(200).json({avatarURL: updatedUser.avatarURL});
    } catch (err) {
        console.log(err);
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    updateSubscriptionController,
    avatarUploadController
}