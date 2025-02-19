const teamModel = require('../models/teamModel');
const playerModel = require('../models/playerModel');
const sendMail = require('../utils/sendMail');
const generateMail = require('../utils/generateMail');
const gamesModel = require('../models/gamesModel');
const { default: mongoose } = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const registerTeam = async(req, res) => {
    const {
        gameName,
        teamName,
        contact,
        teamPlayers,
    } = req.body;
    console.log("details",req.body);
    console.log("players",teamPlayers);
    try {
        const game = await gamesModel.findOne({name: gameName});
        
        if( !game ) {
            return res.status(404).send('Game not found');
        }
        
        let playerIds = [];
        let mailPool = [];
        for( const player of teamPlayers ) {
            const newPlayer = new playerModel(player);
            await newPlayer.save();
            playerIds.push(newPlayer._id);
            const bhejneWalaMail = sendMail(generateMail(newPlayer.email, newPlayer.token,teamName,contact,teamPlayers));
            mailPool.push(bhejneWalaMail);
        };

        const newTeam = new teamModel({
            name: teamName,
            game: game._id,
            contact,
            players: playerIds
        });
        
        await newTeam.save();
        await Promise.all(mailPool);
        res.send(newTeam);
    } catch(err) {
        console.log(err);
        res.send('teamControllers');
    }
}

const getTeams= async(req,res)=>{
    const {gameName}=req.params

     try{
         const game = await gamesModel.findOne({name:gameName})
         if (!game){
            res.status(404).send("Game not found");
         }
         console.log(game._id);
         const teams = await teamModel.find({game: game._id})
         .populate('players')
         const teamList=teams.map(team=>({
            teamName:team.name,
            contact:team.contact,
            players:team.players.map(player=>({
                playerName:player.name,
                playerUID:player.UID,
                playerIGN:player.IGN,
                playerEmail:player.email,
                playerVerify:player.verified
            }))
         }));
        //  res.json({teamList})
        // console.log("teamList",teamList);
        // sendMail(generateMail(teamList))
        const filePath = path.join(__dirname, "../views/teams.ejs");
        ejs.renderFile(filePath, { teamList, gameName }, {}, (err, html) => {
            if (err) {
              console.error("EJS Error:", err);
              return res.status(500).send("Error rendering EJS");
            }
            res.status(200).send(html);
        });

    }
    catch(error){
        console.log(error);
    }
};


module.exports = {
    registerTeam,
    getTeams
};