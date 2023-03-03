const { updateSubscription } = require('../services/userService');
const { imageResizingMiddleware } = require('../middleware/imageResizingMiddleware')
// вынести в сервис?


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
        const [fileName, extension] =  req.file.filename.split('.');
        const filePath = `./tmp/${fileName}.${extension}`;

        await imageResizingMiddleware(filePath, extension);
// Полученный URL /avatars/<имя файла с расширением> сохрани в поле avatarURL пользователя
        res.status(200).json({status: 'success'});
    } catch (err) {
        console.log(err);
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    updateSubscriptionController,
    avatarUploadController
}