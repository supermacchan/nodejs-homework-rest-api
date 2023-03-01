const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        let {
            page = 1,
            limit = 5,
            favorite = null,
            name = null,
            email = null,
        } = req.query;
        limit = limit > 20 ? 20 : limit;
        const skip = (page - 1) * limit;

        const filter = {};

        if (favorite) {
            filter.favorite = favorite;
        }

        if (name) {
            filter.name = name;
        }

        if (email) {
            filter.email = email;
        }

        const contacts = await getContacts(userId, {skip, limit, filter});
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
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;

    try {
        const contact = await addContact({name, email, phone}, userId);
        res.status(201).json(contact);
    } catch (err) {
        res.status(err.status).json(err.message)
    }
}

const updateContactController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json("missing fields");
    }

    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;

    try {
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

    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const { favorite } = req.body;

    try {
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