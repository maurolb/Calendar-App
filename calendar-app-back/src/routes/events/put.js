const { update } = require('../../controllers/events');

const putEvent = async (req, res) => {
  try {
    const updatedEvent = await update(req.body, req.uid, req.params.id);
    if (updatedEvent === 'error not-found') {
      return res.status(404).json({
        ok: false,
        message: 'No se encontró id del evento',
      });
    }
    if (updatedEvent === 'error unauthorized') {
      return res.status(401).json({
        ok: false,
        message: 'No se pudo modificar, el evento no te pertenece',
      });
    }
    return res.status(200).json({ ok: true, updatedEvent });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno, no se pudo actualizar el evento' });
  }
};

module.exports = putEvent;
