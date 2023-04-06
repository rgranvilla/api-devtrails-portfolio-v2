import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { TokenExpiredError } from '@modules/users/errors/token-expired-error';
import { TokenInvalidError } from '@modules/users/errors/token-invalid-error';
import { makeResetPasswordUseCase } from '@modules/users/repositories/prisma/factories/make-reset-password-use-case-factory';

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
    const resetPasswordUseCase = makeResetPasswordUseCase();

    const { user } = await resetPasswordUseCase.execute({
      token,
      password,
    });

    return reply.status(200).send({ user });
  } catch (err) {
    if (err instanceof TokenInvalidError || err instanceof TokenExpiredError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
