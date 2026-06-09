const gamesModel = require('../models/gamesModel');
const AppError = require('../utils/appError');

const getAllGames = async(req, res) => {
    const {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    } = req.query;

    const query = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const sort = {
        [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const skip = (page - 1) * limit;

    const [games, total] = await Promise.all([
        gamesModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
        gamesModel.countDocuments(query),
    ]);

    res.status(200).json({
        success: true,
        data: games,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        },
    });
}

const addGame = async(req, res) => {
    const { name, minPlayers, maxPlayers, rules, img } = req.body;

    const existingGame = await gamesModel.findOne({ name });
    if (existingGame) {
        throw new AppError('Game with this name already exists', 409);
    }

    const game = new gamesModel({ name, minPlayers, maxPlayers, rules, img });
    const newGame = await game.save();
    res.status(201).json({
        success: true,
        data: newGame,
    });
}



module.exports = {
    getAllGames,
    addGame,
};