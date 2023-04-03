import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: 'Hello world' });
  });
}
