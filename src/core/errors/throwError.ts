import { FastifyReply } from 'fastify';

import { UserSkillAlreadyExistsError } from '@errors/skills/userSkillAlreadyExistsError';
import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';
import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';
import { TokenExpiredError } from '@errors/users/tokenExpiredError';
import { TokenInvalidError } from '@errors/users/tokenInvalidError';
import { UserAlreadyExistsError } from '@errors/users/userAlreadyExistsError';
import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

import { ResourceNotFoundError } from './resourceNotFoundError';

export function throwError(
  err: unknown,
  callback: (status: number, message: unknown) => FastifyReply,
) {
  if (err instanceof UserSkillAlreadyExistsError) {
    return callback(409, err.message);
  }

  if (err instanceof UserSkillWithThisIdNotFoundError) {
    return callback(404, err.message);
  }

  if (err instanceof UserWithThisIdNotFoundError) {
    return callback(404, err.message);
  }

  if (err instanceof InvalidCredentialsError) {
    return callback(400, err.message);
  }

  if (err instanceof UserAlreadyExistsError) {
    return callback(409, err.message);
  }

  if (err instanceof TokenInvalidError) {
    return callback(409, err.message);
  }

  if (err instanceof TokenExpiredError) {
    return callback(409, err.message);
  }

  if (err instanceof ResourceNotFoundError) {
    return callback(409, err.message);
  }

  throw err;
}
