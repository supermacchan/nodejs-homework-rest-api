const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
} = require('../services/contactsService');
const Joi = require('joi');

const getContactsController = async (req, res) => {
    try {
        const contacts = await getContacts();
        res.status(200).json({contacts});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    try {
        const contact = await getContactById(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const addContactController = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/[0-9]/).required()
    });

    try {
        await schema.validateAsync(req.body);
        const { name, email, phone } = req.body;
        const contact = await addContact({name, email, phone});
        res.status(201).json(contact);
    } catch (err) {
        return res.status(400).json(err.details[0].message);
    }
}

const updateContactController = async (req, res) => {
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
        const contact = await updateContact(
            contactId,
            {name, email, phone}
        )

        if (!contact) {
          return res.status(404).json({ message: 'Not found' }); 
        }
        return res.status(200).json(contact);

    } catch (err) {
      return res.status(400).json(err.message);
    }
}

const removeContactController = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await removeContact(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ message: "contact deleted" });
    } catch (err) {
        res.status(400).json(err.message);
    }  
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    updateContactController,
    removeContactController
}