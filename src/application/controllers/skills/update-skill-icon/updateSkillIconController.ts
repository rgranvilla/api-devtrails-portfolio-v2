import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { buildUpdateSkillIconUseCaseFactory } from '@repositories/skills/prisma/factories/buildUpdateSkillIconUseCaseFactory';

export async function updateSkillIconController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateSkillIconParamsSchema = z.object({
    user_id: z.string().uuid(),
    skill_id: z.string().uuid(),
  });

  const { skill_id, user_id } = updateSkillIconParamsSchema.parse(
    request.params,
  );

  const updateSkillIconFileSchema = z.object({
    path: z.string(),
  });

  const { path } = updateSkillIconFileSchema.parse(request.file);

  try {
    const updateSkillIconUseCase = buildUpdateSkillIconUseCaseFactory();

    const { userSkill } = await updateSkillIconUseCase.execute({
      skill_id,
      user_id,
      path,
    });

    const response = UserSkillMapper.toHttp(userSkill);

    return reply.status(200).send({ skill: response });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
