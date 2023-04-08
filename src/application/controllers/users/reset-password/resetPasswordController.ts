import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildResetPasswordUseCaseFactory } from '@repositories/users/prisma/factories/buildResetPasswordUseCaseFactory';

export async function resetPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const ResetPasswordQuerySchema = z.object({
    token: z.string().uuid(),
  });

  const ResetPasswordBodySchema = z.object({
    password: z.string(),
  });

  const { token } = ResetPasswordQuerySchema.parse(request.query);
  const { password } = ResetPasswordBodySchema.parse(request.body);

  try {
    const resetPasswordUseCase = buildResetPasswordUseCaseFactory();

    const { user } = await resetPasswordUseCase.execute({
      token,
      password,
    });

    return reply.status(200).send({ user });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
