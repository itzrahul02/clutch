const express = require('express');
const router = express.Router();

const { verifyPlayer } = require('../controllers/playerController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { verifyTokenSchema } = require('../validators/player.validator');

router.get('/:token', validate(verifyTokenSchema), asyncHandler(verifyPlayer));

module.exports = router;