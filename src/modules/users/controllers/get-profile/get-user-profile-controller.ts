import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '@modules/users/repositories/prisma/factories/make-get-profile-use-case';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();

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
