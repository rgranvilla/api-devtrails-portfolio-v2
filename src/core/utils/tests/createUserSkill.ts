import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { UserSkill } from '@domain/skills/entities/userSkill';

type Override = Partial<UserSkill>;

export async function createUserSkill(
  app: FastifyInstance,
  user_id: string,
  token: string,
  override?: Override,
) {
  const response = await request(app.server)
    .post(`/${user_id}/skills/create`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: override?.name ?? 'skill_name',
      proficiency: override?.proficiency ?? 5,
      description: override?.description ?? 'skill_description',
      skill_icon_url: override?.skill_icon_url ?? 'skill_icon_url',
    });

  const userSkill = response.body;

  return {
    userSkill,
    userId: user_id,
  };
}
