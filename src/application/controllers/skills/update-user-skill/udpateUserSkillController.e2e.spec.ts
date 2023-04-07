import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createUserSkill } from '@core/utils/tests/createUserSkill';

import { UserSkill } from '@domain/skills/entities/userSkill';

describe('Update User Skill (e2e)', () => {
  const dataToUpdate = {
    name: 'CSS 3',
    proficiency: 5,
    description: 'css3_description',
    skill_icon_url: 'css3_skill_icon_url',
  };

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

  it('should be able to update an user skill', async () => {
    const { userSkill, userId } = createdUserSkill;

    const result = await request(app.server)
      .patch(`/${userId}/skills/${userSkill.id}/update`)
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
    const { userId } = createdUserSkill;
    const wrongUserSkillId = '123e4567-e89b-12d3-a456-426614174000';

    const result = await request(app.server)
      .patch(`/${userId}/skills/${wrongUserSkillId}/update`)
      .send({ ...dataToUpdate });

    const { message } = result.body;

    expect(result.status).toBe(404);
    expect(message).toBe(
      `The user skill with id ${wrongUserSkillId} not found.`,
    );
  });

  it('should throw error if user id doesnt exists', async () => {
    const { userSkill, userId } = createdUserSkill;
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';

    const result = await request(app.server)
      .patch(`/${wrongUserId}/skills/${userSkill.id}/update`)
      .send({ ...dataToUpdate });

    const { message } = result.body;

    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
