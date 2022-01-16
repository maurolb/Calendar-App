const { getAll } = require('../../controllers/events');

const getEvents = async (req, res) => {
  try {
    const events = await getAll();
    return res.status(200).json({ ok: true, events });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno no se pudo obtener los eventos' });
  }
};

module.exports = getEvents;
