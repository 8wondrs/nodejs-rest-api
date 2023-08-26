const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, checkBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, checkBody, validateBody(schemas.contactAddSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  checkBody,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
