import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { buildSendForgotPasswordMailUseCaseFactory } from '@repositories/users/prisma/factories/buildSendForgotPasswordMailUseCaseFactory';

export async function sendForgotPasswordMailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SendForgotPasswordMailBodySchema = z.object({
    email: z.string().email(),
  });

  const { email } = SendForgotPasswordMailBodySchema.parse(request.body);

  try {
    const sendForgotPasswordMailUseCase =
      buildSendForgotPasswordMailUseCaseFactory();

    const { token } = await sendForgotPasswordMailUseCase.execute(email);

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
