const router = require('express').Router();

const { userSchemaValidate, profileSchemaValidate, avatarSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getUsers,
  getUser,
  getUsersMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', userSchemaValidate, getUser);
router.get('/me', getUsersMe);
router.patch('/me', profileSchemaValidate, updateProfile);
router.patch('/me/avatar', avatarSchemaValidate, updateAvatar);

module.exports = router;
