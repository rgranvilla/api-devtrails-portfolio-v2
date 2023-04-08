import { FastifyInstance } from 'fastify';

import { createUserSkillController } from '@controllers/skills/create-user-skill/createUserSkillController';
import { deleteUserSkillController } from '@controllers/skills/delete-user-skill/deleteUserSkillController';
import { updateUserSkillController } from '@controllers/skills/update-user-skill/updateUserSkillController';

export async function skillsRoutes(app: FastifyInstance) {
  app.post('/:user_id/skills/create', createUserSkillController);
  app.patch('/:user_id/skills/:skill_id/update', updateUserSkillController);
  app.delete('/:user_id/skills/:skill_id/delete', deleteUserSkillController);
}
