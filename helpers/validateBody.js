const requestError = require('./requestError.js');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(requestError(400, error.details[0].message));
    }

    if (Object.keys(value).length === 0) {
      return next(requestError(400, 'Missing fields'));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
