const { loginUser } = require('../../controllers/auth');

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    if (result === 'error email') {
      return res.status(400).json({ ok: false, message: 'Email incorrecto' });
    }
    if (result === 'error pass') {
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({
      ok: true, uid: result.user.id, name: result.user.name, token: result.token,
    });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno, no se pudo logear el usuario' });
  }
};

module.exports = login;
