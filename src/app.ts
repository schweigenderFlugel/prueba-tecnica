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

    const whiteList = ['http://localhost:5173', 'http://localhost:3000'];

    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || whiteList.includes(origin)) callback(null, true);
          else callback(new Error(`You're not allowed due to the CORS policy`));
        },
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
        allowedHeaders: [
          'Content-Type',
          'Api-Key',
          'Access-Control-Allowed-Origin',
          'Access-Control-Allowed-Credentials',
        ],
      }),
    );

    app.use('/api/v1', Routes.routes);

    const spec = swaggerJSDoc(options);
    app.use('/doc', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

    app.use(errorHandler);

    return app;
  }
}
