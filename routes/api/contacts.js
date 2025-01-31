const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../../middleware/authMiddleware');
const {
  addContactMiddleware,
  updateContactMiddleware,
  updateFavoriteMiddleware
} = require('../../middleware/contactMiddleware');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateFavoriteController
} = require('../../controllers/contactsController');

router.use(authMiddleware);

router.get('/', getContactsController);
router.post('/', addContactMiddleware, addContactController);
router.get('/:contactId', getContactByIdController);
router.put('/:contactId', updateContactMiddleware, updateContactController);
router.delete('/:contactId', removeContactController);
router.patch('/:contactId/favorite', updateFavoriteMiddleware, updateFavoriteController);

module.exports = router
