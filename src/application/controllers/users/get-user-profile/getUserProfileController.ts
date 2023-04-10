import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildGetUserProfileUseCaseFactory } from '@repositories/users/prisma/factories/buildGetProfileUseCaseFactory';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const { sub: user_id } = getUserProfileUserSchema.parse(request.user);

  try {
    const getUserProfile = buildGetUserProfileUseCaseFactory();

    const { user } = await getUserProfile.execute({
      user_id,
    });

    return reply.status(200).send({
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
