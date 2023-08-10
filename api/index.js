const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
require("dotenv").config()
const axios = require("axios")
const { PORT } = process.env

// Syncing all the models at once.
conn.sync({ force: false }).then( () => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001', process.env.PORT); // eslint-disable-line no-console
  });
});
