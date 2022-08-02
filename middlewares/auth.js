const jwt = require('jsonwebtoken');

const UnauthorizedErrorCode = 401;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.statusCode = UnauthorizedErrorCode;
    // res
    //   .status(UnauthorizedErrorCode)
    //  .send({ message: 'Необходима авторизация' });
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = UnauthorizedErrorCode;
    // res
    //    .status(UnauthorizedErrorCode)
    //  .send({ message: 'Необходима авторизация' });

    next(err); // пропускаем запрос дальше
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // ???????????
};
