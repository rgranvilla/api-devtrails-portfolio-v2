import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { makeSendForgotPasswordMailUseCase } from '@modules/users/repositories/prisma/factories/make-send-forgot-password-mail-use-case-factiory';

export async function sendForgotPasswordMailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SendForgotPasswordMailBodySchema = z.object({
    email: z.string().email(),
  });

  const { email } = SendForgotPasswordMailBodySchema.parse(request.body);

  try {
    const sendForgotPasswordMailUseCase = makeSendForgotPasswordMailUseCase();

    const { token } = await sendForgotPasswordMailUseCase.execute(email);

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
