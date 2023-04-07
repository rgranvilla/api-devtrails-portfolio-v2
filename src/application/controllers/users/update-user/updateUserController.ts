import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { UserMapper } from '@mappers/users/userMapper';

import { buildUpdateUserUseCaseFactory } from '@repositories/users/prisma/factories/buildUpdateUserUseCaseFactory';

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = updateUserParamsSchema.parse(request.params);

  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    phone_number: z.string().optional(),
    address: z.string().optional(),
    job_title: z.string().optional(),
    short_bio: z.string().optional(),
    profile_image_url: z.string().optional(),
    resume_cv_url: z.string().optional(),
    linkedin_url: z.string().optional(),
    github_url: z.string().optional(),
    instagram_url: z.string().optional(),
    twitter_url: z.string().optional(),
    whatsapp_number: z.string().optional(),
  });

  const toUpdate = updateUserBodySchema.parse(request.body);

  try {
    const updateUserUseCase = buildUpdateUserUseCaseFactory();

    const { user } = await updateUserUseCase.execute({
      userId,
      data: toUpdate,
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return reply.status(200).send({
      user: UserMapper.toHttp(user),
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
