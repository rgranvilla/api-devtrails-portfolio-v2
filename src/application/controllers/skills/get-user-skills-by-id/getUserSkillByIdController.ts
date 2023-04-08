import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

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

    return reply.status(200).send(UserSkillMapper.toHttp(userSkill));
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
