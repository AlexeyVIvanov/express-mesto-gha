const { celebrate, Joi } = require('celebrate');

const regex = /^(https|http):\/\/(www\.)?[\w+\-._~:/?#[\]!$&'()*+,;=]+$/i;

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdSchemaValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const cardSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string(),
  }),
});

const likeSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const cardDeleteSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
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
  userIdSchemaValidate,
  cardSchemaValidate,
  likeSchemaValidate,
  cardDeleteSchemaValidate,
  loginValidate,
  profileSchemaValidate,
  avatarSchemaValidate,
  regex,
};
