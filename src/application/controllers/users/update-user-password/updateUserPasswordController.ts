import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserMapper } from '@mappers/users/userMapper';

import { buildUpdateUserPasswordUseCaseFactory } from '@repositories/users/prisma/factories/buildUpdateUserPasswordUseCaseFactory';

export async function updateUserPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = updateUserParamsSchema.parse(request.params);

  const updateUserBodySchema = z.object({
    password: z.string().min(8),
  });

  const { password } = updateUserBodySchema.parse(request.body);

  try {
    const updateUserUseCase = buildUpdateUserPasswordUseCaseFactory();

    const { user, newPassword } = await updateUserUseCase.execute({
      userId,
      data: {
        password,
      },
    });

    return reply.status(200).send({
      user: UserMapper.toHttp(user),
      newPassword,
    });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
