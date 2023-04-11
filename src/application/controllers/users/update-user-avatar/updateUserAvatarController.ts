import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildUpdateUserAvatarUseCaseFactory } from '@repositories/users/prisma/factories/buildUpdateUserAvatarUseCaseFactory';

export async function updateUserAvatarController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const { sub: user_id } = updateUserUserSchema.parse(request.user);

  const updateUserFileSchema = z.object({
    path: z.string(),
  });

  const { path } = updateUserFileSchema.parse(request.file);

  try {
    const updateUserAvatarUseCase = buildUpdateUserAvatarUseCaseFactory();

    const { profile_image_url } = await updateUserAvatarUseCase.execute({
      user_id,
      path,
    });

    return reply.status(200).send({ profile_image_url: profile_image_url });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
