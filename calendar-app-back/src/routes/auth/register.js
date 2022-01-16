const { createUser } = require('../../controllers/auth');

const register = async (req, res) => {
  try {
    const result = await createUser(req.body);
    if (result === 'error email') {
      return res.status(400).json({ ok: false, message: 'Ya existe un usuario con ese email' });
    }
    return res.status(201).json({
      ok: true, uid: result.id, name: result.name, token: result.token,
    });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno, no se pudo crear el usuario' });
  }
};

module.exports = register;
