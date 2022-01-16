const { renewToken } = require('../../controllers/auth');

const renew = async (req, res) => {
  try {
    const result = await renewToken(req.uid, req.name);
    return res.status(200).json({
      ok: true, uid: result.uid, name: result.name, token: result.newToken,
    });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno, no se pudo renovar el token' });
  }
};

module.exports = renew;
