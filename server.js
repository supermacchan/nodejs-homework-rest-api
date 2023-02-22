const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const username = encodeURIComponent('aibaaki9');
const pass = encodeURIComponent('1L0veGoIT');
const cluster = "cluster0.ixvchmc.mongodb.net";
const uriDb = `mongodb+srv://${username}:${pass}@${cluster}/?retryWrites=true&w=majority`;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful")
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
