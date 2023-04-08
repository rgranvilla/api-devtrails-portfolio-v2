import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { buildCreateUserSkillUseCaseFactory } from '@repositories/skills/prisma/factories/buildCreateUserSkillUseCaseFactory';

export async function createUserSkillController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserSkillParamsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const createUserSkillBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    proficiency: z.coerce.number().default(0),
    skill_icon_url: z.string().optional(),
  });

  const { user_id } = createUserSkillParamsSchema.parse(request.params);

  const { name, description, proficiency, skill_icon_url } =
    createUserSkillBodySchema.parse(request.body);

  try {
    const createUserSkillUseCase = buildCreateUserSkillUseCaseFactory();

    const { userSkill } = await createUserSkillUseCase.execute({
      user_id,
      name,
      description,
      proficiency,
      skill_icon_url,
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
