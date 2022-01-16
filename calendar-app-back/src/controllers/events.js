const Event = require('../models/Event');

const getAll = async () => {
  const events = await Event.find()
    .populate('user', 'name');
  return events;
};

const post = async (data, uid) => {
  const event = new Event(data);

  event.user = uid;

  const newEvent = event.save();

  return newEvent;
};

const update = async (data, uid, eventId) => {
  const event = await Event.findById({ _id: eventId });

  if (!event) {
    return 'error not-found';
  }

  if (event.user.toString() !== uid) {
    return 'error unauthorized';
  }

  const newEvent = {
    ...data,
    user: uid,
  };

  const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

  return updatedEvent;
};

const remove = async (eventId, uid) => {
  const event = await Event.findById({ _id: eventId });
  if (!event) {
    return 'error not-found';
  }

  if (event.user.toString() !== uid) {
    return 'error unauthorized';
  }

  await Event.findOneAndDelete({ _id: eventId });
  return true;
};

module.exports = {
  getAll,
  post,
  update,
  remove,
};
