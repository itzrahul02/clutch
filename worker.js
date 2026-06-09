const dotenv = require('dotenv');
dotenv.config();

const { Worker } = require('bullmq');
const { createRedisConnection } = require('./config/redis');
const { MAIL_QUEUE_NAME } = require('./queue/mailQueue');
const generateMail = require('./utils/generateMail');
const sendMail = require('./utils/sendMail');
const logger = require('./utils/logger');

const redisConnection = createRedisConnection();

if (!redisConnection) {
  logger.error('REDIS_URL is missing. Worker cannot start without Redis connection.');
  process.exit(1);
}

const worker = new Worker(
  MAIL_QUEUE_NAME,
  async (job) => {
    const { to, token, teamName, contact, teamPlayers } = job.data;

    const mailOptions = generateMail(to, token, teamName, contact, teamPlayers);
    await sendMail(mailOptions);

    logger.info({ jobId: job.id, to }, 'Verification email sent');
    return { delivered: true };
  },
  {
    connection: redisConnection,
    concurrency: 10,
  }
);

worker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Mail job completed');
});

worker.on('failed', (job, error) => {
  logger.error({ jobId: job?.id, err: error }, 'Mail job failed');
});

process.on('SIGINT', async () => {
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
});
