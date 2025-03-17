import { Router } from 'express';
import fileRoute from './file.routes';

export default class Routes {
  static get routes(): Router {
    const router = Router();

    router.use('/upload', fileRoute);

    return router;
  }
}
