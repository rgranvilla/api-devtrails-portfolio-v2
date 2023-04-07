import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
}
