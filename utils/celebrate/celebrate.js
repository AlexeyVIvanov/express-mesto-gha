const { celebrate, Joi } = require('celebrate');

const regex = require('../../models/user');

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const cardSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string(),
  }),
});

module.exports = { userSchemaValidate, cardSchemaValidate };
