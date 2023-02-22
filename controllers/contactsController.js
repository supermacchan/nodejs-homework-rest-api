const { Contact } = require('../db/contactsModel');
const Joi = require('joi');

const getContacts = async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json({contacts});
}

const addContact = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/[0-9]/).required()
    });
    
    try {
        await schema.validateAsync(req.body);
        const { name, email, phone } = req.body;
        const contact = new Contact({name, email, phone});
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        return res.status(400).json(err.details[0].message);
    }
}

module.exports = {
    getContacts,
    addContact
}