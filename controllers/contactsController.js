const { Contact } = require('../db/contactsModel');
const Joi = require('joi');

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({contacts});
    } catch (err) {
        console.error(err.message);
    }
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
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

const updateContact = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "missing fields" });
    }
    
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().regex(/[0-9]/).optional()
    });

    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    try {
        await schema.validateAsync(req.body);
        const contact = await Contact.findByIdAndUpdate(
            contactId,
            {$set: {name, email, phone}}
        )

        if (!contact) {
          return res.status(404).json({ message: 'Not found' }); 
        }
        const newContact = await Contact.findById(contactId);
        return res.status(200).json(newContact);
    } catch (err) {
      return res.status(400).json(err.details[0].message);
    }
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact
}