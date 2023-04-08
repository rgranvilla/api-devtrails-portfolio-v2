import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserSkill } from '@core/utils/tests/createUserSkill';

import { UserSkill } from '@domain/skills/entities/userSkill';

describe('Update User Skill (e2e)', () => {
  const dataToUpdate = {
    name: 'CSS 3',
    proficiency: 5,
    description: 'css3_description',
    skill_icon_url: 'css3_skill_icon_url',
  };

  let userSkillData: {
    userSkill: UserSkill;
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

  it('should be able to update an user skill', async () => {
    const { userSkill } = userSkillData;

    const result = await request(app.server)
      .patch(`/${userData.id}/skills/${userSkill.id}/update`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...dataToUpdate });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(
      expect.objectContaining({
        name: 'CSS 3',
        proficiency: 5,
        description: 'css3_description',
        skill_icon_url: 'css3_skill_icon_url',
      }),
    );
  });

  it('should throw error if user skill id doesnt exists', async () => {
    const wrongUserSkillId = '123e4567-e89b-12d3-a456-426614174000';

    const result = await request(app.server)
      .patch(`/${userData.id}/skills/${wrongUserSkillId}/update`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...dataToUpdate });

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
      .patch(`/${wrongUserId}/skills/${userSkill.id}/update`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...dataToUpdate });

    const { message } = result.body;

    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
