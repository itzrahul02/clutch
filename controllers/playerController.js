const playerModel = require('../models/playerModel')
const AppError = require('../utils/appError');

const verifyPlayer = async(req,res)=>{
    const { token } = req.params;
    const player = await playerModel.findOne({ token });
    if( !player ) {
        throw new AppError('Player not found', 404);
    }

    if (!player.verified) {
        player.verified = true;
        await player.save();
    }

    res.redirect('/');
};

module.exports = {
    verifyPlayer,
};