const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers/');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
    'string.pattern.base': 'Name contains only letters',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'missing required email field',
    'string.email': 'email must be a valid email',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
    'string.pattern.base': 'Phone number must be a valid phone number',
  }),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite',
  }),
});

const schemas = { contactAddSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };
