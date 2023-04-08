import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildDeleteUserSkillUseCaseFactory } from '@repositories/skills/prisma/factories/buildDeleteUserSkillUseCaseFactory';

export async function deleteUserSkillController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserSkillParamsSchema = z.object({
    skill_id: z.string().uuid(),
    user_id: z.string().uuid(),
  });

  const { skill_id, user_id } = updateUserSkillParamsSchema.parse(
    request.params,
  );

  try {
    const deleteUserSkillUseCase = buildDeleteUserSkillUseCaseFactory();

    await deleteUserSkillUseCase.execute({
      user_id,
      skill_id,
    });

    return reply
      .status(200)
      .send({ message: `User Skill with id ${skill_id} was deleted.` });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
