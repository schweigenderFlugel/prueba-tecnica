import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/http-error.utils';

export default function errorHandler(
  error: HttpError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const status = error.status || 500;
  const details = error.details || '';

  const errorResponse = {
    status: status,
    details: details,
  };

  res.status(status).json(errorResponse);
}
