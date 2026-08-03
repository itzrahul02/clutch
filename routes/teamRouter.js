const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /api/team:
 *   post:
 *     tags: [Teams]
 *     summary: Register a team and its players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [gameName, teamName, contact, teamPlayers]
 *             properties:
 *               gameName: { type: string }
 *               teamName: { type: string }
 *               contact: { type: string, pattern: '^\\d{8,15}$' }
 *               teamPlayers:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 10
 *                 items:
 *                   type: object
 *                   required: [name, UID, email]
 *                   properties:
 *                     name: { type: string }
 *                     UID: { type: string }
 *                     IGN: { type: string }
 *                     email: { type: string, format: email }
 *     responses:
 *       201: { description: Team registered }
 *       404: { description: Game not found }
 */

const { registerTeam, getTeams } = require('../controllers/teamController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { registerTeamSchema, gameNameParamSchema } = require('../validators/team.validator');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/', validate(registerTeamSchema), asyncHandler(registerTeam));

/**
 * @openapi
 * /api/team/{gameName}:
 *   get:
 *     tags: [Teams]
 *     summary: View the registered teams for a game
 *     description: Returns an HTML team list.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: gameName
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Team list HTML }
 *       401: { description: Authentication required }
 *       404: { description: Game not found }
 */
router.get(
  '/:gameName',
  authenticate,
  authorize('admin', 'coordinator'),
  validate(gameNameParamSchema),
  asyncHandler(getTeams),
);

module.exports = router;
