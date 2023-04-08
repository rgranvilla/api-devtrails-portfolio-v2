import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserSkill } from '@core/utils/tests/createUserSkill';

import { UserSkill } from '@domain/skills/entities/userSkill';

describe('Delete User Skill (e2e)', () => {
  let userSkillData: {
    userSkill: UserSkill;
    userId: string;
  };

  let userData: {
    id: string;
    token: string;
  };

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
    userSkillData = await createUserSkill(app, userData.id, userData.token);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete an user skill', async () => {
    const { userSkill } = userSkillData;

    const result = await request(app.server)
      .delete(`/${userData.id}/skills/${userSkill.id}/delete`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body.message).toBe(
      `User Skill with id ${userSkill.id} was deleted.`,
    );
  });

  it('should throw error if user skill id doesnt exists', async () => {
    const { userId } = userSkillData;
    const wrongUserSkillId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .delete(`/${userId}/skills/${wrongUserSkillId}/delete`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(
      `The user skill with id ${wrongUserSkillId} not found.`,
    );
  });

  it('should throw error if user id doesnt exists', async () => {
    const { userSkill } = userSkillData;
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .delete(`/${wrongUserId}/skills/${userSkill.id}/delete`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
