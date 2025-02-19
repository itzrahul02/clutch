const express = require('express');
const router = express.Router();

const { verifyPlayer } = require('../controllers/playerController');

router.get('/:token', verifyPlayer);

module.exports = router;