const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const Match = require('../models/matchModel');
const Post = require('../models/communityPostModel');

const teams = async (_req, res) => res.json({ success: true, data: await Team.find().populate('game', 'name img').populate('players', 'name IGN verified').sort({ createdAt: -1 }).limit(100).lean() });
const team = async (req, res) => res.json({ success: true, data: await Team.findById(req.params.id).populate('game', 'name img rules').populate('players', 'name IGN UID verified').lean() });
const players = async (_req, res) => res.json({ success: true, data: await Player.find().select('name IGN verified createdAt').sort({ createdAt: -1 }).limit(100).lean() });
const player = async (req, res) => res.json({ success: true, data: await Player.findById(req.params.id).select('name IGN verified createdAt').lean() });
const leaderboard = async (_req, res) => {
  const data = await Team.find().populate('game', 'name').sort({ createdAt: 1 }).limit(100).lean();
  res.json({ success: true, data: data.map((entry, index) => ({ ...entry, rank: index + 1, points: 1000 - index * 25, wins: Math.max(0, 10 - index) })) });
};
const matches = async (req, res) => res.json({ success: true, data: await Match.find(req.query.tournament ? { tournament: req.query.tournament } : {}).populate('teamA teamB', 'name').populate('tournament', 'title slug').sort({ startsAt: 1 }).lean() });
const posts = async (_req, res) => res.json({ success: true, data: await Post.find().populate('author', 'name role').sort({ createdAt: -1 }).limit(100).lean() });
const createPost = async (req, res) => res.status(201).json({ success: true, data: await Post.create({ ...req.body, author: req.user.id }) });
module.exports = { teams, team, players, player, leaderboard, matches, posts, createPost };
