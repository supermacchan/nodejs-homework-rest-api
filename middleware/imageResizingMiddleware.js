const Jimp = require("jimp")
const { v4: uuid } = require('uuid');
const fs = require('fs').promises;

const imageResizingMiddleware = async (filePath, extension) => {
    const newFileName = uuid();
    const savingPath = './public/avatars/';
    try {
        const image = await Jimp.read(filePath);
        const resizedImage = image
                .resize(250, 250)
                .write(
                    `${savingPath}${newFileName}.${extension}`,
                    () => {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                              console.error(err);
                              throw new Error(err);
                            }})
                    }
                );
        return resizedImage;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    imageResizingMiddleware
}