import { FastifyInstance } from 'fastify';

import { createUserSkillController } from '../controllers/create-user-skill-controller';

export async function skillsRoutes(app: FastifyInstance) {
  app.post('/skills/create', createUserSkillController);
}
