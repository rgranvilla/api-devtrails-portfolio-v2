import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

import { env } from '@config/env';

import { errorHandler } from './errorHandler';

describe('Error Handler', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;

  beforeEach(() => {
    console.error = vi.fn();
    request = {} as unknown as FastifyRequest;
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    } as unknown as FastifyReply;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 with validation error message and fields if error is instance of ZodError', () => {
    const error = ZodError.create([
      {
        path: ['email'],
        message: 'Invalid email',
        code: 'invalid_string',
        validation: 'email',
      },
      {
        path: ['password'],
        message: 'Password must be at least 8 characters',
        code: 'too_small',
        minimum: 8,
        type: 'number',
        inclusive: true,
      },
    ]) as unknown as FastifyError;

    const result = errorHandler(error, request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      message: 'Validation error.',
      issues: expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'Invalid email',
        }),
        expect.objectContaining({
          field: 'password',
          message: 'Password must be at least 8 characters',
        }),
      ]),
    });
    expect(result.status).toBeCalled();
  });

  it('should log error to console in development mode', () => {
    const error = new Error('Test error') as unknown as FastifyError;
    const originalEnv = env.NODE_ENV;
    process.env.NODE_ENV = 'dev';

    const result = errorHandler(error, request, reply);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: 'Internal server error.',
    });
    expect(result.status).toBeCalled();

    process.env.NODE_ENV = originalEnv; // restore NODE_ENV
  });

  it('should return 500 with internal server error message in production mode', () => {
    const error = new Error('Test error') as unknown as FastifyError;
    const originalEnv = env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const result = errorHandler(error, request, reply);

    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: 'Internal server error.',
    });
    expect(result.status).toBeCalled();

    process.env.NODE_ENV = originalEnv; // restore NODE_ENV
  });
});
