const { Contact } = require('../db/contactsModel');
const { 
    NotFoundError
 } = require('../helpers/errors');

const getContacts = async () => {
    const contacts = await Contact.find({});
    return contacts;
};

const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw new NotFoundError('Not found');
    }
    return contact;
};

const addContact = async ({name, email, phone}) => {
    const contact = new Contact({name, email, phone});
    await contact.save();
    return contact;
};

const updateContact = async (contactId, {name, email, phone}) => {
    const contact = await Contact.findByIdAndUpdate(
        contactId,
        {$set: {name, email, phone}}
    )

    if (!contact) {
        throw new NotFoundError('Not found');
    }
    const newContact = await Contact.findById(contactId);
    return newContact;
};

const removeContact = async (contactId) => {
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw new NotFoundError('Not found');
    }
    return contact;
};

const updateStatusContact = async (contactId, {favorite}) => {
    const contact = await Contact.findByIdAndUpdate(
        contactId,
        {$set: {favorite}}
    )

    if (!contact) {
        throw new NotFoundError('Not found');
    }
    const newContact = await Contact.findById(contactId);
    return newContact;
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact
}