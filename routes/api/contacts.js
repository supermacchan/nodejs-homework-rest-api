const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateFavoriteController
} = require('../../controllers/contactsController');

router.get('/', getContactsController);
router.post('/', addContactController);
router.get('/:contactId', getContactByIdController);
router.put('/:contactId', updateContactController);
router.delete('/:contactId', removeContactController);
router.patch('/:contactId/favorite', updateFavoriteController);
 

module.exports = router
