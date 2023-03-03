const Jimp = require("jimp")
const { v4: uuid } = require('uuid');

const imageResizingMiddleware = async (filePath, extension) => {
    const newFileName = uuid();
    try {
        const image = await Jimp.read(filePath);
        const resizedImage = image
                .resize(250, 250)
                .write(`${newFileName}.${extension}`);
        return resizedImage;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    imageResizingMiddleware
 }