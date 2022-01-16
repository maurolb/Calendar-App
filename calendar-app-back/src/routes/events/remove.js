const { remove } = require('../../controllers/events');

const removeEvent = async (req, res) => {
  try {
    const removedEvent = await remove(req.params.id, req.uid);
    if (removedEvent === 'error not-found') {
      return res.status(404).json({
        ok: false,
        message: 'No se encontró id del evento',
      });
    }

    if (removedEvent === 'error unauthorized') {
      return res.status(401).json({
        ok: false,
        message: 'No se pudo eliminar, el evento no te pertenece',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log('error ', error.message);
    return res.status(500).json({ ok: false, message: 'Error interno, no se pudo borrar el evento' });
  }
};

module.exports = removeEvent;
