import { Request, Response, NextFunction, ResponseError } from 'express';
import createError from 'http-errors';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
}

export function errorHandler(err: ResponseError, req: Request, res: Response) {
  res.status(err.status || 500);
  res.send(err.message);
}
