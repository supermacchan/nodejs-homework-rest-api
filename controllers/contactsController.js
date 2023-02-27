const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact
} = require('../services/contactsService');
const Joi = require('joi');

const getContactsController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const contacts = await getContacts(userId);
        res.status(200).json({contacts});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    try {
        const contact = await getContactById(contactId, userId);
        res.status(200).json(contact);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

const addContactController = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/[0-9]/).required()
    });

    try {
        const { _id: userId } = req.user;
        await schema.validateAsync(req.body);
        const { name, email, phone } = req.body;
        const contact = await addContact({name, email, phone}, userId);
        res.status(201).json(contact);
    } catch (err) {
        return res.status(400).json(err.details[0].message);
    }
}

const updateContactController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json("missing fields");
    }
    
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().regex(/[0-9]/).optional()
    });

    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;

    try {
        await schema.validateAsync(req.body);
        const contact = await updateContact(
            contactId,
            {name, email, phone},
            userId
        )
        return res.status(200).json(contact);

    } catch (err) {
      return res.status(err.status).json(err.message);
    }
}

const removeContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    try {
        await removeContact(contactId, userId);
        res.status(200).json("contact deleted");
    } catch (err) {
        res.status(err.status).json(err.message);
    }  
}

const updateFavoriteController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json("missing field favorite");
    }

    const schema = Joi.object({
        favorite: Joi.boolean().required()
    });

    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const { favorite } = req.body;

    try {
        await schema.validateAsync(req.body);
        const contact = await updateStatusContact(contactId, {favorite}, userId);
        res.status(200).json(contact);
    } catch (err) {
        res.status(err.status).json(err.message);
    }  
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    updateContactController,
    removeContactController,
    updateFavoriteController
}