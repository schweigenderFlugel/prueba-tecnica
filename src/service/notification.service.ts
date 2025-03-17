import { Router, Request, Response, NextFunction } from 'express';

interface IDataResponse {
  username: string;
  email: string;
}

function errorHandler(_req: Request, res: Response, _next: NextFunction): void {
  const status = res.statusCode || 500;
  const details = res.statusMessage || '';

  const errorResponse = {
    status: status,
    details: details,
  };

  res.status(status).json(errorResponse);
}

class DataController {
  static async getData(_req: Request, res: Response<IDataResponse>, next: NextFunction) {
    try {
      const data: IDataResponse = {
        username: 'user497',
        email: 'user@email.com',
      };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

const route = Router();

route.get('/data', DataController.getData, errorHandler);

export default route;
