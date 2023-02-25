const { User } = require('../db/usersModel');

const register = async (email, password) => {
    const user = new User({
        email,
        password
    });
    await user.save();
}

const login = async () => {

}

module.exports = {
    register,
    login
}