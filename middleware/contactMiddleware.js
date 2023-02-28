const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const addContactMiddleware = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/[0-9]/).required()
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        next(new ValidationError(err.details[0].message));
    }
}

const updateContactMiddleware = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().regex(/[0-9]/).optional()
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        next(new ValidationError(err.details[0].message));
    }
}

module.exports = {
    addContactMiddleware,
    updateContactMiddleware
}