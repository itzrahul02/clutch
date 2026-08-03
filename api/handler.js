const { dbConnect } = require('../config/dbConnect');
const app = require('../index');

let databaseConnection;

module.exports = async (req, res) => {
  try {
    databaseConnection ??= dbConnect();
    await databaseConnection;
    return app(req, res);
  } catch (error) {
    databaseConnection = undefined;
    return res.status(503).json({
      message: 'The API database connection is unavailable.',
    });
  }
};
