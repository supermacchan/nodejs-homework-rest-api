// временный файл с заметками и кусками кода по вебинарам

// Multer adds a body object and a file or files object to the request object. 
// The body object contains the values of the text fields of the form, 
// the file or files object contains the files uploaded via the form.

// Basic usage example:
// Don't forget the enctype="multipart/form-data" in your form.

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>

// === КОНТРОЛЛЕР ===

const avatarUploadController = async (req, res) => {
    res.status(200).json({status: 'success'});
}
// +
// module.exports = { avatarUploadController }

// === В ФАЙЛЕ РОУТЕРА ===
const multer  = require('multer')
const path = require('path')

const express = require('express')
const router = express.Router()

// конфигурация мультера - задаем путь для сохранения файлов
// динамический путь
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/avatars'));
        // работает от src, поэтому пишем путь от корня
    },
    filename: (req, file, cb) => {
        const [fileName, extension] =  file.originalname.split('.');
        cb(null, `${fileName}.${extension}`);
        // обязательно нужно задавать файлам уникальные названия
        // иначе если загрузят файлы с одинаковым названием и расширением
        // кто-то может случайно затереть чей-то файл
        // например, пак uuid
        // в данном примере - оригинальное имя файла
    }
})

// статический
// const upload = multer({ dest: './public/avatars' })

const uploadMiddleware = multer({storage});

router.patch('/avatars', uploadMiddleware.single('avatar'), avatarUploadController);

module.exports = router


// POSTMAN
// /api/users/avatars PATCH
// body > form-data
// KEY: avatar (change type to file)
// VALUE: choose file

