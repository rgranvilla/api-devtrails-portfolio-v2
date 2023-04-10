import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserMapper } from '@mappers/users/userMapper';

import { buildUpdateUserUseCaseFactory } from '@repositories/users/prisma/factories/buildUpdateUserUseCaseFactory';

export async function updateUserRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const { sub: user_id } = updateUserUserSchema.parse(request.user);

  const updateUserBodySchema = z.object({
    role: z.enum(['admin', 'creator', 'subscriber']).optional(),
  });

  const toUpdate = updateUserBodySchema.parse(request.body);

  try {
    const updateUserUseCase = buildUpdateUserUseCaseFactory();

    const { user } = await updateUserUseCase.execute({
      user_id,
      data: toUpdate,
    });

    const { role, sub } = request.user;

    const logoutIsNeeded =
      role === 'admin' && user_id === sub && toUpdate.role !== 'admin';

    if (logoutIsNeeded) {
      return reply
        .status(200)
        .clearCookie('refreshToken')
        .send({
          user: UserMapper.toHttp(user),
          message:
            'Your user has been logged out. You need to perform a new login to proceed.',
        });
    } else {
      return reply.status(200).send({
        user: UserMapper.toHttp(user),
      });
    }
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
