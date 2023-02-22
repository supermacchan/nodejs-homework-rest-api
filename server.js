const app = require('./app');
const mongoose = require('mongoose');
// require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDb = "mongodb+srv://aibaaki9:1L0veGoIT@cluster0.ixvchmc.mongodb.net/?retryWrites=true&w=majority";

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
