const playerModel = require('../models/playerModel')

const verifyPlayer = async(req,res)=>{
    const { token } = req.params;
    try {
        const player = await playerModel.findOne({ token });
        if( !player ) {
            res.status(403).send('Player not found');
            return
        }
        if( player.verified ) {
            res.redirect('/')
            return
        }
        player.verified = true;
        await player.save();
        res.redirect('/');
    } catch( err ) {
        res.status(500).send('yatrigan kripya dhyan, server busy hai to thoda jal grahan kare');
        console.log(err);
    }
};

module.exports = {
    verifyPlayer,
};