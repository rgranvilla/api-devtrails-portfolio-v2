import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { buildGetUserSkillByIdUseCaseFactory } from '@repositories/skills/prisma/factories/buildGetUserSkillByIdUseCaseFactory';

export async function getUserSkillByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllUserSkillsParamsSchema = z.object({
    user_id: z.string().uuid(),
    skill_id: z.string().uuid(),
  });

  const { user_id, skill_id } = getAllUserSkillsParamsSchema.parse(
    request.params,
  );

  try {
    const getUserSkillByIdUseCase = buildGetUserSkillByIdUseCaseFactory();

    const { userSkill } = await getUserSkillByIdUseCase.execute({
      user_id,
      skill_id,
    });

    const parsedUserSkill = userSkill ? UserSkillMapper.toHttp(userSkill) : [];

    return reply.status(200).send(parsedUserSkill);
  } catch (error) {
    if (error instanceof UserWithThisIdNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
