
const User = require('../models/user');

const ERROR_CODE = 400;
const ERR_CODE = 404;
const ERRORCODE = 500;

module.exports.getUsers = (req, res) => {
  User.find(req.params)
      .then(user => {
        if(!user) {
          res.status(ERR_CODE).send({ message: "Запрашиваемый пользователь не найден" });
        }
        res.send({ data: user })
      })
      .catch(err => res.status(ERRORCODE).send({ message: "Запрашиваемый пользователь не найден" }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
      .then(user => {
        if(!user) {
          res.status(ERR_CODE).send({ message: "Запрашиваемый пользователь не найден" });
        }
        res.send({ data: user })
      })
      .catch(err => res.status(ERRORCODE).send({ message: "Запрашиваемый пользователь не найден" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // записываем данные в базу
  User.create({ name, about, avatar })
    // возвращаем записанные в базу данные пользователю
    .then(user => res.send({ data: user }))
    // если данные не записались, вернём ошибку
    .catch(err => {
      if(err.name === "ValidationError") {
        return res.status(ERROR_CODE).send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.status(ERRORCODE).send({ message: "Запрашиваемый пользователь не найден" })
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.params.userId)
      .then(user => res.send({ data: user }))
      .catch(err => {
        if(err.name === "ValidationError") {
          return res.status(ERROR_CODE).send({ message: "Запрашиваемый пользователь не найден" });
        }
        res.status(ERRORCODE).send({ message: "Запрашиваемый пользователь не найден" })
      });
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.userId)
      .then(user => res.send({ data: user }))
      .catch(err => {
        if(err.name === "ValidationError") {
          return res.status(ERROR_CODE).send({ message: "Запрашиваемый пользователь не найден" });
        }
        res.status(ERRORCODE).send({ message: "Запрашиваемый пользователь не найден" })
      });
}
