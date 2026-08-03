const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const Tournament = require('../models/tournamentModel');
const AppError = require('../utils/appError');

const createOrder = async (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
    throw new AppError('Payments are not configured yet. Add Razorpay keys to the server environment.', 503);
  const tournament = await Tournament.findById(req.params.tournamentId).lean();
  if (!tournament) throw new AppError('Tournament not found', 404);
  if (!tournament.entryFee) throw new AppError('This tournament has no entry fee', 400);
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString(
    'base64',
  );
  const providerResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(tournament.entryFee * 100),
      currency: 'INR',
      receipt: `clutch_${String(tournament._id).slice(-10)}_${Date.now()}`,
      notes: { tournamentId: String(tournament._id), userId: req.user.id },
    }),
  });
  const order = await providerResponse.json();
  if (!providerResponse.ok)
    throw new AppError(order.error?.description || 'Could not create payment order', 502);
  await Payment.create({
    user: req.user.id,
    tournament: tournament._id,
    amount: tournament.entryFee,
    providerOrderId: order.id,
  });
  res.status(201).json({
    success: true,
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      tournament: tournament.title,
    },
  });
};
const verifyPayment = async (req, res) => {
  const payment = await Payment.findOne({ providerOrderId: req.body.razorpay_order_id });
  if (!payment || String(payment.user) !== req.user.id) throw new AppError('Payment order not found', 404);
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${payment.providerOrderId}|${req.body.razorpay_payment_id}`)
    .digest('hex');
  const received = Buffer.from(req.body.razorpay_signature || '', 'utf8');
  const actual = Buffer.from(expected, 'utf8');
  if (received.length !== actual.length || !crypto.timingSafeEqual(received, actual)) {
    payment.status = 'failed';
    await payment.save();
    throw new AppError('Payment signature verification failed', 400);
  }
  payment.status = 'paid';
  payment.providerPaymentId = req.body.razorpay_payment_id;
  await payment.save();
  res.json({ success: true, data: payment });
};
module.exports = { createOrder, verifyPayment };
