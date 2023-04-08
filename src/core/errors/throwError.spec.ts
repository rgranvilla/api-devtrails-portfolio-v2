import { FastifyReply } from 'fastify';
import { describe, expect, it } from 'vitest';

import { throwError } from './throwError';

describe('throwError', () => {
  it('should throw an error with the given input', () => {
    expect(() => throwError('Test Error', {} as FastifyReply)).toThrow(
      'Test Error',
    );
    expect(() =>
      throwError(new Error('Test Error'), {} as FastifyReply),
    ).toThrow(new Error('Test Error'));
  });
});
