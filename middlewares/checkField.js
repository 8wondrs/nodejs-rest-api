const { RequestError } = require('../helpers');

const checkField = (req, res, next) => {
  const body = req.body;
  const requiredFields = ['name', 'email', 'phone'];

  const missingField = requiredFields.find(field => !body[field]);

  if (missingField) {
    const errorMessage = `Missing required ${missingField} field`;
    throw RequestError(errorMessage, 400);
  }

  next();
};

module.exports = checkField;
