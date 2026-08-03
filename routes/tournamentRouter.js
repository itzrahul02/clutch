const express = require('express');
const { createTournament, listTournaments, getTournament } = require('../controllers/tournamentController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { createTournamentSchema, listTournamentsSchema, tournamentSlugSchema } = require('../validators/tournament.validator');

const router = express.Router();

router.get('/', validate(listTournamentsSchema), asyncHandler(listTournaments));
router.post('/', authenticate, authorize('admin', 'coordinator'), validate(createTournamentSchema), asyncHandler(createTournament));
router.get('/:slug', validate(tournamentSlugSchema), asyncHandler(getTournament));

module.exports = router;
