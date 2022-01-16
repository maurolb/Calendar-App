const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'El token es requerido en la petición',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token inválido',
    });
  }

  return next();
};

module.exports = jwtValidator;
