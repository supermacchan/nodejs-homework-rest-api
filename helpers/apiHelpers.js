const { ContactListAppError } = require('./errors');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ContactListAppError){
        return res.status(err.status).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
};

module.exports = {
    errorHandler
}