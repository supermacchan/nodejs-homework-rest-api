const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contactList = await contacts.listContacts();
  res.status(200).json(contactList);
})

router.get('/:contactId', async (req, res, next) => {
  const requestedContact = await contacts.getContactById(req.params.contactId);
  if (requestedContact.length > 0) {
    return res.status(200).json(requestedContact);
  }
  res.status(404).json({ message: 'Not found' });
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const tryDeleteContact = await contacts.removeContact(req.params.contactId);
  if (tryDeleteContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: 'Not found' });
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
