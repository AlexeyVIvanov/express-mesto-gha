const router = require('express').Router();

const { userSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getUsers,
  getUser,
  getUsersMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', userSchemaValidate, getUser);
router.get('/me', userSchemaValidate, getUsersMe);
router.patch('/me', userSchemaValidate, updateProfile);
router.patch('/me/avatar', userSchemaValidate, updateAvatar);

module.exports = router;
