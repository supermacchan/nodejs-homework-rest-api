const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
} = require('../../controllers/contactsController');

router.get('/', getContacts);
router.post('/', addContact);
router.get('/:contactId', getContactById);
router.put('/:contactId', updateContact);
router.delete('/:contactId', removeContact);
 

module.exports = router
