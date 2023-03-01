const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const subscriptionCheckMiddleware = async (req, res, next) => {
    const schema = Joi.object({
        subscription: Joi.string().valid("starter", "pro", "business").required()
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        next(new ValidationError(err.details[0].message));
    }
}

module.exports = {
    subscriptionCheckMiddleware
}
