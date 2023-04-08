import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';
import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

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
  } catch (error) {
    if (error instanceof UserSkillWithThisIdNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof UserWithThisIdNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
