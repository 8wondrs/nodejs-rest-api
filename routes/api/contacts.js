const express = require('express');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const ctrlContacts = require('../../controllers/contacts');
const validateBody = require('../../helpers/validateBody');
const schema = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrlContacts.listContacts));

router.get('/:contactId', ctrlWrapper(ctrlContacts.getContactById));

router.post('/', validateBody(schema.contactSchema), ctrlWrapper(ctrlContacts.addContact));

router.delete('/:contactId', ctrlWrapper(ctrlContacts.removeContact));

router.put(
  '/:contactId',
  validateBody(schema.contactSchema),
  ctrlWrapper(ctrlContacts.updateContact)
);

module.exports = router;
