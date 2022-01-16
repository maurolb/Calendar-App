const { post } = require('../../controllers/events');

const postEvent = async (req, res) => {
  try {
    const newPost = await post(req.body, req.uid);
    return res.status(200).json({ ok: true, newPost });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno no se pudo crear el evento' });
  }
};

module.exports = postEvent;
