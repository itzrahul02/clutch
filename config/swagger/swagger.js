const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const env = require('../env');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Clutch API',
      version: '1.0.0',
      description: 'Gaming event platform backend APIs',
      contact: {
        name: 'Clutch API Support',
      },
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
      schemas: {
        Error: {
          type: 'object',
          required: ['success', 'message'],
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'A validation error occurred' },
          },
        },
      },
    },
  },
  // An absolute glob works in serverless deployments, where process.cwd()
  // is not guaranteed to be the project root.
  apis: [__dirname.split(path.sep).join('/') + '/../../routes/**/*.js'],
};

module.exports = swaggerJSDoc(options);
