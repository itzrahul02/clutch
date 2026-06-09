const AppError = require("../utils/appError");

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    return next(new AppError(message, 400));
  }

  req.body = result.data.body;
  req.params = result.data.params;
  req.query = result.data.query;

  return next();
};

module.exports = validate;
