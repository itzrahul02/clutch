const express = require('express');
const router = express.Router();

const { registerTeam,getTeams } = require('../controllers/teamController');

router.post('/', registerTeam);

router.get('/:gameName',getTeams)

module.exports = router;