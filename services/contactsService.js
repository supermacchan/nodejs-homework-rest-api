const { Contact } = require('../db/contactsModel');

const getContacts = async () => {
    const contacts = await Contact.find({});
    return contacts;
};

const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
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
      return null; 
    }
    const newContact = await Contact.findById(contactId);
    return newContact;
};

const removeContact = async (contactId) => {
    const contact = await Contact.findByIdAndRemove(contactId);
    return contact;
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
}