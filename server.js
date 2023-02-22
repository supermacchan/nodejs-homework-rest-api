const app = require('./app');
const connection = require('./db/connection');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connection.connectMongo();
    app.listen(PORT, () => {
      console.log("Database connection successful")
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

start();
