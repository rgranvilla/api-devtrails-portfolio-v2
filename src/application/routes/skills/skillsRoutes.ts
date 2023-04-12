import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { throwError } from '@core/errors/throwError';
import { uploadSkillIcon } from '@core/middlewares/register';
import { verifyJwt } from '@core/middlewares/verifyJWT';

import { createUserSkillController } from '@controllers/skills/create-user-skill/createUserSkillController';
import { deleteUserSkillController } from '@controllers/skills/delete-user-skill/deleteUserSkillController';
import { getAllUserSkillsController } from '@controllers/skills/get-all-user-skills/getAllUserSkillsController';
import { getUserSkillByIdController } from '@controllers/skills/get-user-skills-by-id/getUserSkillByIdController';
import { updateSkillIconController } from '@controllers/skills/update-skill-icon/updateSkillIconController';
import { updateUserSkillController } from '@controllers/skills/update-user-skill/updateUserSkillController';

export async function skillsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/:user_id/skills/create', createUserSkillController);

  app.patch('/:user_id/skills/:skill_id/update', updateUserSkillController);

  app.delete('/:user_id/skills/:skill_id/delete', deleteUserSkillController);

  app.get('/:user_id/skills', getAllUserSkillsController);

  app.get('/:user_id/skills/:skill_id', getUserSkillByIdController);

  app.patch(
    '/:user_id/skills/:skill_id',
    {
      preHandler: [uploadSkillIcon],
      errorHandler: (err, request: FastifyRequest, reply: FastifyReply) => {
        throwError(err, (status, message) => {
          return reply.status(status).send({ message });
        });
      },
    },
    updateSkillIconController,
  );
}
