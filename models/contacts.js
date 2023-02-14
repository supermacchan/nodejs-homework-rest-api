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
  

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

// function removeContact(contactId) {
//   fs.readFile(contactsPath)
//   .then (data => {
//       const parsedData = JSON.parse(data.toString());
//       const filteredContacts = parsedData.filter(contact => contact.id !== contactId);
//       fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
//   })
//   .catch (error => console.error(error.message));
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath)
//   .then (data => {
//       const parsedData = JSON.parse(data.toString());
//       const lastId = parsedData[parsedData.length - 1].id;
//       const newContact = {
//           id: `${Number(lastId) + 1}`,
//           name,
//           email,
//           phone
//       };
//       const updateContacts = parsedData.push(newContact);
//       fs.writeFile(contactsPath, JSON.stringify(parsedData));
//   })
//   .catch (error => console.error(error.message));
// }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
