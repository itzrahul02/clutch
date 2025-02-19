const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
      console.log("connected to Mongodb");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { dbConnect };
