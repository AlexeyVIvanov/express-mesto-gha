const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// const ConflictError = require('../utils/errors/conflict');

const NotFoundError = require('../utils/errors/not-found');

const UnauthorizedError = require('../utils/errors/unauthorized');

const ERROR_CODE = 400;
// const UnauthorizedErrorCode = 401;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name,
      about,
      avatar,
    }))
  // const { name, about, avatar } = req.body;
  // записываем данные в базу
  // User.create({ name, about, avatar })
    // возвращаем записанные в базу данные пользователю
    .then((user) => res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(409)
          .send({ message: 'Пользователь с таким email уже зарегистрирован' });
        //    throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then(() => res.send({ name, about }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then(() => res.send({ avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Неверный запрос' });
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    // .then((err) => {
    //  if (err.code === 11000) {
    //    throw new ConflictError('Пользователь с таким email уже зарегистрирован');
    //  }
    // })
    .then((user) => {
      if (!user) {
        // пользователь не найден — отклоняем промис
        // с ошибкой и переходим в блок catch
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
          // хеши не совпали — отклоняем промис
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          // хеши совпали - возвращаем пользователя
          return user;
        });
    })
    .then((user) => {
      // аутентификация успешна
      // res.send({ message: 'Всё верно!' });
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
      // , { message: 'Всё верно!' }
      // );
    })
    .catch(next);
  // .catch(() => {
  // возвращаем ошибку аутентификации
  //   res
  //     .status(UnauthorizedErrorCode)
  //    .send({ message: 'Неправильные почта или пароль' });
  // });
  // next();
};
