import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { buildGetAllUserSkillsUseCaseFactory } from '@repositories/skills/prisma/factories/buildGetAllUserSkillsUseCaseFactory';

export async function getAllUserSkillsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllUserSkillsParamsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = getAllUserSkillsParamsSchema.parse(request.params);

  try {
    const getAllUserSkillsUseCase = buildGetAllUserSkillsUseCaseFactory();

    const { userSkills } = await getAllUserSkillsUseCase.execute({
      user_id,
    });

    const parsedUserSkills = userSkills
      ? userSkills.map((skill) => UserSkillMapper.toHttp(skill))
      : [];

    return reply.status(200).send(parsedUserSkills);
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
