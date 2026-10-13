import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

import { AppError } from '@domain/errors/app-error';

interface RequestValidationSchemas {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(
          req.query,
        )) as Request['query'];
      }

      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(
          req.params,
        )) as Request['params'];
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return next(
          new AppError('Dados de entrada inválidos', 400, issueDetails),
        );
      }

      next(error);
    }
  };
};
