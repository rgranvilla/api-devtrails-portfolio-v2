import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildGetUserProfileUseCaseFactory } from '@repositories/users/prisma/factories/buildGetProfileUseCaseFactory';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileParamsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = getUserProfileParamsSchema.parse(request.params);

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
