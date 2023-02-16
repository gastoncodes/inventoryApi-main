const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = () => {
  mongoose
    .set({
      strictQuery: true,
    })
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;
