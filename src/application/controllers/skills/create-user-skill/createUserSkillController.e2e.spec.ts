import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

describe('Create User Skill (e2e)', () => {
  const userSkill = {
    name: 'skill_name',
    proficiency: 5,
  };

  let user: {
    token: string;
    refreshToken: string;
    id: string;
  };

  beforeAll(async () => {
    await app.ready();
    user = await createAndAuthenticateUser(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create an user', async () => {
    const result = await request(app.server)
      .post(`/${user.id}/skills/create`)
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
      .post(`/${user.id}/skills/create`)
      .send({ ...userSkill });

    const result = await request(app.server)
      .post(`/${user.id}/skills/create`)
      .send({ ...userSkill });

    const { message } = result.body;

    expect(result.status).toBe(409);
    expect(message).toBe('This skill already exist, it cannot be duplicated.');
  });
});
