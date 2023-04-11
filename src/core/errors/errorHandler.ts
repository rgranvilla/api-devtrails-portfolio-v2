import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { MulterError } from 'fastify-multer';
import { ZodError } from 'zod';

import { env } from '@config/env';

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const err = {
      message: 'Validation error.',
      issues: error.errors.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
      })),
    };

    return reply.status(400).send(err);
  }

  if (error instanceof MulterError) {
    const err = {
      message: 'Errrroooooouuuuuu!',
    };

    return reply.status(400).send(err);
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
}
