const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data.toString());
  return result;
    // .catch (error => console.error(error.message));
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
