const { Contact } = require('../db/contactsModel');
const { 
    NotFoundError
 } = require('../helpers/errors');

const getContacts = async (owner, {skip, limit, favorite}) => {
    let query = {owner};
    if (favorite) {
        query =  { owner, favorite };
    }

    const contacts = await 
        Contact
            .find(query)
            .select({__v: 0})
            .skip(skip)
            .limit(limit);
    return contacts;
};

const getContactById = async (contactId, owner) => {
    const contact = await 
        Contact
            .findOne({_id: contactId, owner})
            .select({__v: 0});
    if (!contact) {
        throw new NotFoundError('Not found');
    }
    return contact;
};

const addContact = async ({name, email, phone}, owner) => {
    const contact = new Contact({name, email, phone, owner});
    await contact.save();
    return contact;
};

const updateContact = async (contactId, {name, email, phone}, owner) => {
    const contact = await Contact.findOneAndUpdate(
        {_id: contactId, owner},
        {$set: {name, email, phone}},
        {
            returnDocument: 'after',
            returnNewDocument: true
        })
        .select({__v: 0});

    if (!contact) {
        throw new NotFoundError('Not found');
    }

    return contact;
};

const removeContact = async (contactId, owner) => {
    const contact = await Contact.findOneAndRemove({_id: contactId, owner});
    if (!contact) {
        throw new NotFoundError('Not found');
    }
    return contact;
};

const updateStatusContact = async (contactId, {favorite}, owner) => {
    const contact = await Contact.findOneAndUpdate(
        {_id: contactId, owner},
        {$set: {favorite}}
    )

    if (!contact) {
        throw new NotFoundError('Not found');
    }
    const newContact = await Contact.findById(contactId).select({__v: 0});
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