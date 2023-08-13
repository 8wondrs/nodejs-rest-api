const { isValidObjectId } = require('mongoose');
const RequestError = require('../helpers/RequestError');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(RequestError(404, 'Not found'));
  }
  next();
};

module.exports = isValidId;
