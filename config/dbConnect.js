const mongoose = require("mongoose");
const logger = require("../utils/logger");
const env = require("./env");

const dbConnect = async () => {
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it in your environment variables before starting backend.");
  }

  await mongoose.connect(env.MONGO_URI);
  logger.info("Connected to MongoDB");
};

module.exports = { dbConnect };
