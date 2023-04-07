import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

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
    name: z.string(),
    description: z.string().optional(),
    proficiency: z.coerce.number().default(0),
    skill_icon_url: z.string().optional(),
  });

  const { skill_id, user_id } = updateUserSkillParamsSchema.parse(
    request.params,
  );

  const { name, proficiency, description, skill_icon_url } =
    updateUserSkillBodySchema.parse(request.body);

  try {
    const updateUserSkillUseCase = buildUpdateUserSkillUseCaseFactory();

    const { userSkill } = await updateUserSkillUseCase.execute({
      skill_id,
      user_id,
      name,
      proficiency,
      description,
      skill_icon_url,
    });

    const response = UserSkillMapper.toHttp(userSkill);

    return reply.status(201).send({
      ...response,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
