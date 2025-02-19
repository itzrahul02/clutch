const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');


const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 1234;

app.use(express.static('public'))
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" })); 

const { dbConnect } = require('./config/dbConnect');
dbConnect();

const gamesRouter = require('./routes/gamesRouter');
const teamRouter = require('./routes/teamRouter');
const playerRouter = require('./routes/playersRouter');


app.set('view engine','ejs');
app.use('/api/games', gamesRouter);
app.use('/api/team', teamRouter);
app.use('/api/player', playerRouter);
app.use('/api/team',teamRouter)
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

if( process.env.ENV == 'dev' ) {
    app.listen(PORT, () => {
        console.log(`sun rha hu bhai: ${PORT}`);
    });
}
module.exports = app;