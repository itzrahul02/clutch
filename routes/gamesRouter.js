const express = require('express');
const router = express.Router();

const { getAllGames, addGame } = require('../controllers/gamesController');

router.get('/', getAllGames);
router.post('/add', addGame);

module.exports = router;