const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();
router.post('/tournaments/:tournamentId/order', authenticate, asyncHandler(createOrder));
router.post('/verify', authenticate, asyncHandler(verifyPayment));
module.exports = router;
