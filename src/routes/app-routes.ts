import { FastifyInstance } from 'fastify';

import { skillsRoutes } from '@modules/skills/routes/skills-routes';
import { authRoutes } from '@modules/users/routes/auth-routes';
import { passwordRoutes } from '@modules/users/routes/password-routes';
import { usersRoutes } from '@modules/users/routes/users-routes';

export async function appRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: 'Hello world' });
  });

  app.register(usersRoutes);
  app.register(authRoutes);
  app.register(passwordRoutes);
  app.register(skillsRoutes);
}
