const swaggerJSDoc = require('swagger-jsdoc');
const env = require('../env');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Clutch API',
      version: '1.0.0',
      description: 'Gaming event platform backend APIs',
    },
    servers: [
      {
        url: env.APP_BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);
