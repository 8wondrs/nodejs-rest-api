const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, checkBody } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', checkBody, validateBody(schemas.contactAddSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  isValidId,
  checkBody,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
