const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../db/usersModel');
const { 
    RegistrationConflictError,
    AuthorizationError
 } = require('../helpers/errors');



const register = async (email, password) => {
    const userCheck = await User.findOne({email});
    if (userCheck) {
        throw new RegistrationConflictError("Email in use");
    }

    const user = new User({
        email,
        password
    });
    await user.save();
}

const login = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new AuthorizationError("Email or password is wrong");
    }

    // тут что-то идет не так, пароль пропускает любой сейчас
    const passwordCheck = bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        throw new AuthorizationError("Email or password is wrong");
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET);

    return { token, userId: user._id };
}

module.exports = {
    register,
    login
}