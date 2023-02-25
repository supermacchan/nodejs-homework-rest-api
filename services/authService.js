const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../db/usersModel');



const register = async (email, password) => {
    const userCheck = await User.findOne({email});
    if (userCheck) {
        return null;
    }

    const user = new User({
        email,
        password
    });
    await user.save();
    return user;
}

const login = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        return null;
    }

    // тут что-то идет не так, пароль пропускает любой сейчас
    const passwordCheck = bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return null;
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET);
    // СРОК ВАЛИДНОСТИ ТОКЕНА?

    return token;
}

module.exports = {
    register,
    login
}