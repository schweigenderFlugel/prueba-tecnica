import { Options } from 'swagger-jsdoc';

export const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba tecnica',
      version: '1.0.0',
      description: 'API Documentation',
    },
  },
  apis: ['./**/docs/*.yml'],
};
