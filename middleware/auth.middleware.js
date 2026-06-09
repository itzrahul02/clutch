const asyncHandler = require('./asyncHandler');
const AppError = require('../utils/appError');
const { verifyAccessToken } = require('../utils/jwt');
const userModel = require('../models/userModel');

const authenticate = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Unauthorized: missing or invalid bearer token', 401);
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (_err) {
    throw new AppError('Unauthorized: invalid or expired token', 401);
  }

  const user = await userModel.findById(decoded.sub).lean();
  if (!user || !user.isActive) {
    throw new AppError('Unauthorized: user not found or inactive', 401);
  }

  req.user = {
    id: String(user._id),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  next();
});

const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', 401));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError('Forbidden: insufficient role', 403));
  }

  return next();
};

module.exports = {
  authenticate,
  authorize,
};
