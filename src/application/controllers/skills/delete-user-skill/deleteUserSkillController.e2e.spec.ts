import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createUserSkill } from '@core/utils/tests/createUserSkill';

import { UserSkill } from '@domain/skills/entities/userSkill';

describe('Delete User Skill (e2e)', () => {
  let createdUserSkill: {
    userSkill: UserSkill;
    userId: string;
  };

  beforeAll(async () => {
    await app.ready();
    createdUserSkill = await createUserSkill(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete an user skill', async () => {
    const { userSkill, userId } = createdUserSkill;

    const result = await request(app.server)
      .delete(`/${userId}/skills/${userSkill.id}/delete`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body.message).toBe(
      `User Skill with id ${userSkill.id} was deleted.`,
    );
  });

  it('should throw error if user skill id doesnt exists', async () => {
    const { userId } = createdUserSkill;
    const wrongUserSkillId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .delete(`/${userId}/skills/${wrongUserSkillId}/delete`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(
      `The user skill with id ${wrongUserSkillId} not found.`,
    );
  });

  it('should throw error if user id doesnt exists', async () => {
    const { userSkill } = createdUserSkill;
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .delete(`/${wrongUserId}/skills/${userSkill.id}/delete`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
