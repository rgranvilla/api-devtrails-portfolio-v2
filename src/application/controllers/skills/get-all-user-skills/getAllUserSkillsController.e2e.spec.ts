import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserSkill } from '@core/utils/tests/createUserSkill';

describe('Get All User Skills (e2e)', () => {
  let userData: {
    id: string;
    token: string;
  };

  beforeAll(async () => {
    await app.ready();

    userData = await createAndAuthenticateUser(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get all user skills', async () => {
    const firstRequest = await request(app.server)
      .get(`/${userData.id}/skills`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(firstRequest.status).toBe(200);
    expect(firstRequest.body).toHaveLength(0);

    await createUserSkill(app, userData.id, userData.token, {
      name: 'NodeJs',
      proficiency: 5,
    });
    await createUserSkill(app, userData.id, userData.token, {
      name: 'HTML 5',
      proficiency: 5,
    });

    const secondRequest = await request(app.server)
      .get(`/${userData.id}/skills`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(secondRequest.status).toBe(200);
    expect(secondRequest.body).toHaveLength(2);
    expect(secondRequest.body[0].name).toBe('NodeJs');
    expect(secondRequest.body[1].name).toBe('HTML 5');
  });

  it('should throw error if user id doesnt exists', async () => {
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await request(app.server)
      .get(`/${wrongUserId}/skills`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();
    const { message } = result.body;
    expect(result.status).toBe(404);
    expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  });
});
