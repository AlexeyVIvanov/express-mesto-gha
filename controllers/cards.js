const Card = require('../models/card');

const ERROR_CODE = 400;
const ERR_CODE = 404;
const ERRORCODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        res
          .status(ERR_CODE)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res
      .status(ERRORCODE)
      .send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (!user) {
        res
          .status(ERR_CODE)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      return res
        .status(ERRORCODE)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      return res
        .status(ERRORCODE)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((user) => {
    if (!user) {
      res
        .status(ERR_CODE)
        .send({ message: 'Запрашиваемая карточка не найдена' });
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Неверный запрос' });
    }
    return res
      .status(ERRORCODE)
      .send({ message: 'Внутренняя ошибка сервера' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((user) => {
    if (!user) {
      res
        .status(ERR_CODE)
        .send({ message: 'Запрашиваемая карточка не найдена' });
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Неверный запрос' });
    }
    return res
      .status(ERRORCODE)
      .send({ message: 'Внутренняя ошибка сервера' });
  });
