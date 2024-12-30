import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import Routes from './routes';
import errorHandler from './middleware/error-handler.middleware';
import { options } from './utils/swagger.utils';

export default class App {
  start(): express.Express {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api/v1', Routes.routes);

    const spec = swaggerJSDoc(options);
    app.use('/doc', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

    app.use(errorHandler);

    return app;
  }
}
