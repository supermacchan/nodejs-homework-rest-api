const jwt = require('jsonwebtoken');
require('dotenv').config();

const { AuthorizationError } = require('../helpers/errors');


const authMiddleware = async (req, res, next) => {
    // eslint-disable-next-line dot-notation
    const [tokenType, token] = req.headers["authorization"].split(" ");
    console.log(tokenType);

    if (!token) {
        next(new AuthorizationError("Not authorized"));
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        next(new AuthorizationError("Not authorized"));
    }
}


module.exports = {
    authMiddleware
}