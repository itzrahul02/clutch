const { Queue } = require('bullmq');
const { createRedisConnection } = require('../config/redis');
const logger = require('../utils/logger');

const MAIL_QUEUE_NAME = 'mail-queue';

const redisConnection = createRedisConnection();

const mailQueue = redisConnection
  ? new Queue(MAIL_QUEUE_NAME, { connection: redisConnection })
  : null;

const enqueueVerificationMail = async ({ to, token, teamName, contact, teamPlayers }) => {
  if (!mailQueue) {
    logger.warn('Redis not configured; skipping queue enqueue for verification email');
    return null;
  }

  const job = await mailQueue.add(
    'send-verification-email',
    {
      to,
      token,
      teamName,
      contact,
      teamPlayers,
    },
    {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: {
        age: 3600,
        count: 1000,
      },
      removeOnFail: {
        age: 86400,
      },
    }
  );

  return job.id;
};

module.exports = {
  MAIL_QUEUE_NAME,
  mailQueue,
  enqueueVerificationMail,
};
