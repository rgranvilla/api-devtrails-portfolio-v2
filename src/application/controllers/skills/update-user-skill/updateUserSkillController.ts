import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { buildUpdateUserSkillUseCaseFactory } from '@repositories/skills/prisma/factories/buildUpdateUserSkillUseCaseFactory';

export async function updateUserSkillController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserSkillParamsSchema = z.object({
    skill_id: z.string().uuid(),
    user_id: z.string().uuid(),
  });

  const updateUserSkillBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    proficiency: z.coerce.number().optional(),
    skill_icon_url: z.string().optional(),
  });

  const { skill_id, user_id } = updateUserSkillParamsSchema.parse(
    request.params,
  );

  const userSkillToUpdate = updateUserSkillBodySchema.parse(request.body);

  try {
    const updateUserSkillUseCase = buildUpdateUserSkillUseCaseFactory();

    const { userSkill } = await updateUserSkillUseCase.execute({
      skill_id,
      user_id,
      data: userSkillToUpdate,
    });

    const response = UserSkillMapper.toHttp(userSkill);

    return reply.status(201).send({
      ...response,
    });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
