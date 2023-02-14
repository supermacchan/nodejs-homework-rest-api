const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contactList = await contacts.listContacts();
  res.status(200).json(contactList);
})

router.get('/:contactId', async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
