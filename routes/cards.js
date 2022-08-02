const router = require('express').Router();

const { cardSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', cardSchemaValidate, deleteCard);
router.post('/', cardSchemaValidate, createCard);
router.put('/:cardId/likes', cardSchemaValidate, likeCard);
router.delete('/:cardId/likes', cardSchemaValidate, dislikeCard);

module.exports = router;
