const mongoose = require('mongoose');

const { regex } = require('../utils/celebrate/celebrate');

const { ObjectId } = mongoose.Schema;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Байкал',
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Неверный формат',
    },
    default: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
