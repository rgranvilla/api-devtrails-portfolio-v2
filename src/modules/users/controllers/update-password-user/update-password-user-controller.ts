import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { UserMapper } from '@modules/users/mapper/user-mapper';
import { makeUpdatePasswordUserUseCase } from '@modules/users/repositories/prisma/factories/make-update-password-user-use-case';

export async function updatePasswordUserController(
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
    const updateUserUseCase = makeUpdatePasswordUserUseCase();

    const { user, newPassword } = await updateUserUseCase.execute({
      userId,
      data: {
        password,
      },
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return reply.status(200).send({
      user: UserMapper.toHttp(user),
      newPassword,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
