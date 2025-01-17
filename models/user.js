const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verification token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registrationSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.pattern.base': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.pattern.base': 'Invalid password format',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.pattern.base': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.pattern.base': 'Invalid password format',
    'any.required': 'Password is required',
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.pattern.base': 'Invalid email format',
    'any.required': 'missing required field email',
  }),
});

const schemas = { registrationSchema, loginSchema, emailSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
