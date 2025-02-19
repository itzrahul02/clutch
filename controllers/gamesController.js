const gamesModel = require('../models/gamesModel');

const getAllGames = async(req, res) => {
    const games = await gamesModel.find();
    res.json(games);
}

const addGame = async(req, res) => {
    const { name, minPlayers, maxPlayers, rules, img } = req.body;
    const game = new gamesModel({ name, minPlayers, maxPlayers, rules, img });
    const newGame = await game.save();
    res.send(newGame);
}



module.exports = {
    getAllGames,
    addGame,
};