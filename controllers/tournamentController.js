const Tournament = require('../models/tournamentModel');
const Game = require('../models/gamesModel');
const AppError = require('../utils/appError');

const slugify = (value) => value.toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const createTournament = async (req, res) => {
  const { gameId, title, ...details } = req.body;
  const game = await Game.findById(gameId).lean();
  if (!game) throw new AppError('Selected game was not found', 404);

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 2;
  while (await Tournament.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const tournament = await Tournament.create({
    ...details,
    title,
    slug,
    game: gameId,
    createdBy: req.user.id,
  });

  res.status(201).json({ success: true, data: tournament });
};

const listTournaments = async (req, res) => {
  const { status, gameId, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (gameId) query.game = gameId;
  if (search) query.title = { $regex: search, $options: 'i' };

  const tournaments = await Tournament.find(query)
    .populate('game', 'name img minPlayers maxPlayers')
    .sort({ startsAt: 1 })
    .lean();
  res.json({ success: true, data: tournaments });
};

const getTournament = async (req, res) => {
  const tournament = await Tournament.findOne({ slug: req.params.slug })
    .populate('game', 'name img minPlayers maxPlayers rules')
    .populate('createdBy', 'name')
    .lean();
  if (!tournament) throw new AppError('Tournament not found', 404);
  res.json({ success: true, data: tournament });
};

module.exports = { createTournament, listTournaments, getTournament };
