import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validateUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const RequestSchema = z.object({
    user_id: z.string().uuid(),
  });
  const { user_id } = RequestSchema.parse(request.query);

  const logged_user_id = request.user.sub;

  if (logged_user_id !== user_id) {
    return reply.status(403).send({ message: 'Forbidden' });
  }
}
