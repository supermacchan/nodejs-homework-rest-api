const Jimp = require("jimp");
const { v4: uuid } = require('uuid');
const fs = require('fs').promises;

const imageResizingMiddleware = async (filePath, extension, userId) => {
    const savingPath = './public';
    const savingFolder = '/avatars/';
    const imageID = uuid();
    const newFileLocation = `${savingFolder}${userId}-${imageID}.${extension}`;

    try {
        const image = await Jimp.read(filePath);
        image
            .resize(250, 250)
            .write(
                `${savingPath}${newFileLocation}`,
                () => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            throw new Error(err);
                        }})
                }
            );
        return newFileLocation;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    imageResizingMiddleware
}