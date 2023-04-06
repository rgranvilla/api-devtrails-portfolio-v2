import { FastifyReply, FastifyRequest } from 'fastify';

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  return reply
    .clearCookie('refreshToken')
    .send({ message: 'Logout realizado com sucesso' });
}
