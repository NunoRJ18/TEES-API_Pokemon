import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@domain/errors/app-error';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Erro de validação.',
      details: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  console.error(error);

  return res.status(500).json({
    error: 'Erro interno do servidor.',
  });
}
