import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserMapper } from '@mappers/users/userMapper';

import { buildUpdateUserPasswordUseCaseFactory } from '@repositories/users/prisma/factories/buildUpdateUserPasswordUseCaseFactory';

export async function updateUserPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const { sub: user_id } = updateUserUserSchema.parse(request.user);

  const updateUserBodySchema = z.object({
    new_password: z.string().min(8),
    old_password: z.string().min(8),
  });

  const { new_password, old_password } = updateUserBodySchema.parse(
    request.body,
  );

  try {
    const updateUserUseCase = buildUpdateUserPasswordUseCaseFactory();

    const { user, password } = await updateUserUseCase.execute({
      user_id,
      data: {
        new_password,
        old_password,
      },
    });

    return reply.status(200).send({
      user: UserMapper.toHttp(user),
      password,
    });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
