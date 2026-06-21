const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const pinoHttp = require('pino-http');
const swaggerUi = require('swagger-ui-express');

const dotenv = require('dotenv');
dotenv.config();

const env = require('./config/env');
const logger = require('./utils/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const swaggerSpec = require('./config/swagger/swagger');

const app = express();
const PORT = env.PORT;

app.set('trust proxy', 1);

app.use(
    pinoHttp({
        logger,
        customSuccessMessage: function (req, res) {
            return `${req.method} ${req.url} completed with ${res.statusCode}`;
        },
    })
);

app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(express.static('public'))
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: env.CLIENT_ORIGIN }));

const { dbConnect } = require('./config/dbConnect');

// Lazy DB connection for serverless (Vercel)
let dbConnected = false;
app.use(async (_req, _res, next) => {
    if (!dbConnected) {
        await dbConnect();
        dbConnected = true;
    }
    next();
});

const gamesRouter = require('./routes/gamesRouter');
const teamRouter = require('./routes/teamRouter');
const playerRouter = require('./routes/playersRouter');
const authRouter = require('./routes/authRouter');

app.get('/api/status',(req,res)=>{
    res.json({
        message:`Backend is running on port: ${PORT}`
    })
})

app.get('/healthz', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.set('view engine','ejs');
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth', authLimiter, authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/team', teamRouter);
app.use('/api/player', playerRouter);
app.use('/api/v1/auth', authLimiter, authRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/team', teamRouter);
app.use('/api/v1/player', playerRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
    dbConnect().then(() => {
        app.listen(PORT, () => {
            logger.info(`Backend is running on port ${PORT}`);
        });
    }).catch((err) => {
        logger.error({ err }, 'Failed to connect to database during startup');
        process.exit(1);
    });
}

module.exports = app;