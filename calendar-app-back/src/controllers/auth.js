const bcrypt = require('bcryptjs');
const jwtGenerator = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (user) {
    return 'error email';
  }

  user = new User(userData);

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(userData.password, salt);

  const { id, name } = await user.save();

  const token = await jwtGenerator(user.id, user.name);
  return { id, name, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return 'error email';
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return 'error pass';
  }

  const token = await jwtGenerator(user.id, user.name);
  return { user, token };
};

const renewToken = async (uid, name) => {
  const newToken = await jwtGenerator(uid, name);
  return { newToken, uid, name };
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
