const jwt = require('jsonwebtoken');

const jwtGenerator = (uid, name) => new Promise((resolve, reject) => {
  const payload = { uid, name };

  jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' }, (error, token) => {
    if (error) {
      console.log(error);
      reject(new Error('El token no puede ser generado'));
    }
    resolve(token);
  });
});

module.exports = jwtGenerator;
