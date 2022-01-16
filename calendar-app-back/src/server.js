require('dotenv-flow').config();
const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/config');

const router = require('./routes/router');

const { PORT } = process.env;

const main = async () => {
  await dbConnection();

  const app = express();

  app.use(cors());

  app.use(express.static('public'));
  app.use(express.json());
  app.use(urlencoded({ extended: true }));

  app.use([router]);

  app.listen(PORT, () => {
    console.log('server on port ', PORT);
  });
};

main();
