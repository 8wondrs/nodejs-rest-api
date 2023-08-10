const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.pattern.base': `Name must be in format: FirstName LastName`,
    'any.required': `Missing required name field`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.email': `Invalid email format`,
      'any.required': `Missing required email field`,
    }),
  phone: Joi.string().required().messages({
    'string.pattern.base': `Phone number must be in format: 000-000-0000`,
    'any.required': `Missing required phone field`,
  }),
});

module.exports = { contactSchema };
