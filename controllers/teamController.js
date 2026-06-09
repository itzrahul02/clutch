const teamModel = require('../models/teamModel');
const playerModel = require('../models/playerModel');
const { enqueueVerificationMail } = require('../queue/mailQueue');
const sendMail = require('../utils/sendMail');
const generateMail = require('../utils/generateMail');
const gamesModel = require('../models/gamesModel');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

const registerTeam = async(req, res) => {
    const {
        gameName,
        teamName,
        contact,
        teamPlayers,
    } = req.body;
    const game = await gamesModel.findOne({name: gameName});

    if( !game ) {
        throw new AppError('Game not found', 404);
    }

    const duplicateTeam = await teamModel.findOne({ name: teamName, game: game._id });
    if (duplicateTeam) {
        throw new AppError('Team with this name is already registered for the selected game', 409);
    }

    const session = await mongoose.startSession();

    let newTeam;
    let createdPlayers = [];

    await session.withTransaction(async () => {
        createdPlayers = await playerModel.insertMany(teamPlayers, { session });

        newTeam = await teamModel.create(
            [
                {
                    name: teamName,
                    game: game._id,
                    contact,
                    players: createdPlayers.map((player) => player._id),
                },
            ],
            { session }
        );
    });

    session.endSession();

    const queueJobs = await Promise.allSettled(
        createdPlayers.map((player) =>
            enqueueVerificationMail({
                to: player.email,
                token: player.token,
                teamName,
                contact,
                teamPlayers,
            })
        )
    );

    const queuedCount = queueJobs.filter((result) => result.status === 'fulfilled' && result.value).length;

    if (queuedCount !== createdPlayers.length) {
        const fallbackMailPool = createdPlayers.map((player) =>
            sendMail(generateMail(player.email, player.token, teamName, contact, teamPlayers))
        );
        const fallbackResult = await Promise.allSettled(fallbackMailPool);
        const fallbackFailed = fallbackResult.filter((result) => result.status === 'rejected').length;

        if (fallbackFailed > 0) {
            logger.warn({ fallbackFailed, teamName }, 'Some verification emails failed in fallback mode');
        }
    }

    res.status(201).json({
        success: true,
        data: newTeam[0],
        emailDispatch: {
            requested: createdPlayers.length,
            queued: queuedCount,
            fallback: queuedCount !== createdPlayers.length,
        },
    });
}

const getTeams = async (req, res) => {
    const { gameName } = req.params;

    const game = await gamesModel.findOne({ name: gameName });
    if (!game) {
        throw new AppError('Game not found', 404);
    }

    const teams = await teamModel.find({ game: game._id }).populate('players');

    const teamList = teams.map((team) => ({
        teamName: team.name,
        contact: team.contact,
        players: team.players.map((player) => ({
            playerName: player.name,
            playerUID: player.UID,
            playerIGN: player.IGN,
            playerEmail: player.email,
            playerVerify: player.verified,
        })),
    }));

    const filePath = path.join(__dirname, '../views/teams.ejs');
    ejs.renderFile(filePath, { teamList, gameName }, {}, (err, html) => {
        if (err) {
            logger.error({ err, gameName }, 'Error rendering teams EJS view');
            return res.status(500).send('Error rendering team list');
        }
        return res.status(200).send(html);
    });
};



module.exports = {
    registerTeam,
    getTeams
};