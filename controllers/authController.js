const userModel = require('../models/userModel');
const AppError = require('../utils/appError');
const { signAccessToken } = require('../utils/jwt');

const sanitizeUser = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await userModel.findOne({ email });
  if (existing) {
    throw new AppError('User with this email already exists', 409);
  }

  const user = await userModel.create({
    name,
    email,
    password,
    role: role || 'player',
  });

  const token = signAccessToken({ sub: String(user._id), role: user.role, email: user.email });

  res.status(201).json({
    success: true,
    data: {
      user: sanitizeUser(user),
      token,
      tokenType: 'Bearer',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!user.isActive) {
    throw new AppError('User account is inactive', 403);
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signAccessToken({ sub: String(user._id), role: user.role, email: user.email });

  res.status(200).json({
    success: true,
    data: {
      user: sanitizeUser(user),
      token,
      tokenType: 'Bearer',
    },
  });
};

const me = async (req, res) => {
  const user = await userModel.findById(req.user.id).lean();
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: {
      user: sanitizeUser(user),
    },
  });
};

module.exports = {
  register,
  login,
  me,
};
