import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@modules/users/errors/user-already-exists-error';

import { UserSkillMapper } from '../mappers/user-skill-mapper';
import { makeCreateUserSkillUseCase } from '../repositories/prisma/factories/make-create-user-skill-use-case-factory';

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
    const createUserSkillUseCase = makeCreateUserSkillUseCase();

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
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
