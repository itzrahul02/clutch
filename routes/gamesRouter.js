const express = require('express');
const router = express.Router();

const { getAllGames, addGame } = require('../controllers/gamesController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { addGameSchema, listGamesSchema } = require('../validators/games.validator');
const { authenticate, authorize } = require('../middleware/auth.middleware');

/**
 * @openapi
 * /api/games:
 *   get:
 *     summary: Get games with pagination and filters
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, name]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Paginated game list
 *       400:
 *         description: Invalid query parameters
 */
router.get('/', validate(listGamesSchema), asyncHandler(getAllGames));

/**
 * @openapi
 * /api/games/add:
 *   post:
 *     summary: Create a game (admin/coordinator)
 *     tags:
 *       - Games
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, minPlayers, maxPlayers, rules, img]
 *             properties:
 *               name: { type: string, minLength: 2 }
 *               minPlayers: { type: integer, minimum: 1 }
 *               maxPlayers: { type: integer, minimum: 1 }
 *               rules:
 *                 type: array
 *                 minItems: 1
 *                 items: { type: string }
 *               img: { type: string }
 *     responses:
 *       201:
 *         description: Game created successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin or coordinator role required
 *       409:
 *         description: Game already exists
 */
router.post(
  '/add',
  authenticate,
  authorize('admin', 'coordinator'),
  validate(addGameSchema),
  asyncHandler(addGame),
);

module.exports = router;
