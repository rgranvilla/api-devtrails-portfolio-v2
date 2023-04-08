import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

describe('Create User Skill (e2e)', () => {
  const userSkill = {
    name: 'skill_name',
    proficiency: 5,
  };

  let userData: {
    token: string;
    id: string;
  };

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create an user', async () => {
    const result = await request(app.server)
      .post(`/${userData.id}/skills/create`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...userSkill });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(
      expect.objectContaining({
        name: 'skill_name',
        proficiency: 5,
      }),
    );
  });

  it('should throw error if skill already exists', async () => {
    await request(app.server)
      .post(`/${userData.id}/skills/create`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...userSkill });

    const result = await request(app.server)
      .post(`/${userData.id}/skills/create`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...userSkill });

    const { message } = result.body;

    expect(result.status).toBe(409);
    expect(message).toBe('This skill already exist, it cannot be duplicated.');
  });
});
