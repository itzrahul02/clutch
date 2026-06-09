const express = require('express');
const router = express.Router();

const { registerTeam,getTeams } = require('../controllers/teamController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { registerTeamSchema, gameNameParamSchema } = require('../validators/team.validator');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/', validate(registerTeamSchema), asyncHandler(registerTeam));

router.get('/:gameName', authenticate, authorize('admin', 'coordinator'), validate(gameNameParamSchema), asyncHandler(getTeams))

module.exports = router;