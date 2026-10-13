import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

import { AppError } from '@domain/errors/app-error';
import { PrismaErrorMapper } from '@infrastructure/database/prisma/prisma-error-mapper';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    const responsePayload: Record<string, unknown> = {
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    };

    if (error.details !== undefined && error.details !== null) {
      responsePayload.details = error.details;
    }

    return res.status(error.statusCode).json(responsePayload);
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Dados de entrada inválidos.',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const appError = PrismaErrorMapper.toAppError(error);

    return res.status(appError.statusCode).json({
      status: 'error',
      statusCode: appError.statusCode,
      message: appError.message,
    });
  }

  console.error('Uncaught system exception:', error);

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Erro interno do servidor.',
  });
}
