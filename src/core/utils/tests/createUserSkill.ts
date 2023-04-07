import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { UserSkill } from '@domain/skills/entities/userSkill';

import { createAndAuthenticateUser } from './createAndAuthenticateUser';

type Override = Partial<UserSkill>;

export async function createUserSkill(
  app: FastifyInstance,
  override?: Override,
) {
  const { id } = await createAndAuthenticateUser(app);

  const response = await request(app.server)
    .post(`/${id}/skills/create`)
    .send({
      name: override?.name ?? 'skill_name',
      proficiency: override?.proficiency ?? 5,
      description: override?.description ?? 'skill_description',
      skill_icon_url: override?.skill_icon_url ?? 'skill_icon_url',
    });

  const userSkill = response.body;

  return {
    userSkill,
    userId: id,
  };
}
