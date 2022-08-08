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
    owner: Joi.string().required(),
  }),
});

const likeSchemaValidate = celebrate({
  body: Joi.object().keys({
    owner: Joi.string().required(),
    likes: Joi.array().default([]),
  }),
});

const cardDeleteSchemaValidate = celebrate({
  body: Joi.object().keys({
    owner: Joi.string().required(),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const profileSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarSchemaValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

module.exports = {
  userSchemaValidate,
  cardSchemaValidate,
  likeSchemaValidate,
  cardDeleteSchemaValidate,
  loginValidate,
  profileSchemaValidate,
  avatarSchemaValidate,
};
