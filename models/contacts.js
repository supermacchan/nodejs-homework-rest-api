const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data.toString());
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data.toString());
    const locatedContact = parsedData.filter(contact => contact.id === contactId);
    return locatedContact;
  } catch (e) {
    console.error(e.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data.toString());
    if (parsedData.some(contact => contact.id === contactId)) {
      const filteredContacts = parsedData.filter(contact => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      return true;
    }
    return false;
  } catch (e) {
    console.error(e.message);
  }
}

const addContact = async ({name, email, phone}) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data.toString());
    const lastId = parsedData[parsedData.length - 1].id;
    const newContact = {
      id: `${Number(lastId) + 1}`,
      name,
      email,
      phone
    };
    const update = parsedData.push(newContact);
    console.log(update);
    fs.writeFile(contactsPath, JSON.stringify(parsedData));
    return newContact;
  } catch (e) {
    console.error(e.message);
  }
}

const updateContact = async (contactId, body) => {}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
