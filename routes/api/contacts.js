const express = require('express')
const router = express.Router()
const contacts = require('../../models/contacts');
const Joi = require('joi');

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
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/[0-9]/).required()
  });

  try {
      await schema.validateAsync(req.body);
      const addNewContact = await contacts.addContact(req.body);
      return res.status(201).json(addNewContact);
  }
  catch (err) {
    return res.status(400).json(err.details[0].message);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const tryDeleteContact = await contacts.removeContact(req.params.contactId);
  if (tryDeleteContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: 'Not found' });
})

router.put('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().regex(/[0-9]/).optional()
  });

  try {
      await schema.validateAsync(req.body);
      const tryUpdateContact = await contacts.updateContact(req.params.contactId, req.body);
      if (!tryUpdateContact) {
        return res.status(404).json({ message: 'Not found' }); 
      }
      return res.status(200).json(tryUpdateContact);
  } catch (err) {
    return res.status(400).json(err.details[0].message);
  }
})
  

module.exports = router
