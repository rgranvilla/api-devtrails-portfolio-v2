import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserSkill } from '@core/utils/tests/createUserSkill';

import { UserSkill } from '@domain/skills/entities/userSkill';

describe('Get All User Skills (e2e)', () => {
  let userSkillData: {
    userSkill: UserSkill;
    userId: string;
  };

  let userData: {
    id: string;
  };

  beforeAll(async () => {
    await app.ready();

    userData = await createAndAuthenticateUser(app);

    await createUserSkill(app, userData.id, {
      name: 'NodeJs',
      proficiency: 5,
    });
    userSkillData = await createUserSkill(app, userData.id, {
      name: 'HTML 5',
      proficiency: 5,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get an user skill by skill id', async () => {
    const { userId } = userSkillData;

    const result = await request(app.server).get(`/${userId}/skills`).send();

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(2);
    expect(result.body[0].name).toBe('NodeJs');
    expect(result.body[1].name).toBe('HTML 5');
  });

  it('should throw error if user id doesnt exists', async () => {
    const { userSkill } = userSkillData;
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .delete(`/${wrongUserId}/skills/${userSkill.id}/delete`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
