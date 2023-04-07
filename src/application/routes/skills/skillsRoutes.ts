import { FastifyInstance } from 'fastify';

import { createUserSkillController } from '@controllers/skills/create-user-skill/createUserSkillController';
import { updateUserSkillController } from '@controllers/skills/update-user-skill/updateUserSkillController';

export async function skillsRoutes(app: FastifyInstance) {
  app.post('/:user_id/skills/create', createUserSkillController);
  app.patch('/:user_id/skills/:skill_id/update', updateUserSkillController);
}
