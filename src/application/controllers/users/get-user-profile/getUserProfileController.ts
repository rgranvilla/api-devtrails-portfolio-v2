import { FastifyReply, FastifyRequest } from 'fastify';

import { buildGetUserProfileUseCaseFactory } from '@repositories/users/prisma/factories/buildGetProfileUseCaseFactory';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = buildGetUserProfileUseCaseFactory();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
