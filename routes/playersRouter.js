const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /api/player/{token}:
 *   get:
 *     tags: [Players]
 *     summary: Verify a player email token
 *     description: Marks the player as verified and redirects to the homepage.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema: { type: string, minLength: 64, maxLength: 64 }
 *     responses:
 *       302: { description: Player verified and redirected }
 *       404: { description: Player not found }
 */

const { verifyPlayer } = require('../controllers/playerController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { verifyTokenSchema } = require('../validators/player.validator');

router.get('/:token', validate(verifyTokenSchema), asyncHandler(verifyPlayer));

module.exports = router;
