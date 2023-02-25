const { User } = require('../db/usersModel');
const bcrypt = require('bcrypt');

const register = async (email, password) => {
    const user = new User({
        email,
        password: await bcrypt.hash(password, 10)
    });
    await user.save();
}

const login = async () => {

}

module.exports = {
    register,
    login
}