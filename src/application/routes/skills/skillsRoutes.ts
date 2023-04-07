import { FastifyInstance } from 'fastify';

import { createUserSkillController } from '@controllers/skills/create-user-skill/createUserSkillController';

export async function skillsRoutes(app: FastifyInstance) {
  app.post('/skills/create', createUserSkillController);
}
