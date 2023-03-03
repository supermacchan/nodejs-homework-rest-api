const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
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
        password,
        avatarURL: gravatar.url(email)
    });
    await user.save();
}

const login = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new AuthorizationError("Email or password is wrong");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        throw new AuthorizationError("Email or password is wrong");
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET);

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { token } }
    )

    return { token, updatedUser };
}

const checkCurrentUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AuthorizationError("Not Authorized");
    }

    return user;
}

const logout = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { token: null } }
    )

    if (!user) {
        throw new AuthorizationError("Not Authorized");
    }

    return user;
}

module.exports = {
    register,
    login,
    checkCurrentUser,
    logout
}