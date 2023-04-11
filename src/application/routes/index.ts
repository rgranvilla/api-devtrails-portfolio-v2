import { FastifyInstance } from 'fastify';

import { skillsRoutes } from './skills/skillsRoutes';
import { authRoutes } from './users/authRoutes';
import { passwordRoutes } from './users/passwordRoutes';
import { usersRoutes } from './users/usersRoutes';

export async function appRoutes(app: FastifyInstance) {
  app
    .register(usersRoutes)
    .register(authRoutes)
    .register(passwordRoutes)
    .register(skillsRoutes);
}
