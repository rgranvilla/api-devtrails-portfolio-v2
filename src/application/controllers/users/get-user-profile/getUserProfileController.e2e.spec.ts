import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

describe('Profile (e2e)', () => {
  let userData: {
    token: string;
    refreshToken: string;
    id: string;
  };

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    const { token, id } = userData;
    const profileResponse = await request(app.server)
      .get(`/users/${id}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
  });

  it('should throw user not found error if has a wrong user id', async () => {
    const { token } = userData;
    const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';

    const result = await request(app.server)
      .get(`/users/${wrongUserId}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toEqual(404);
    expect(result.body.message).toBe(
      `The user with id ${wrongUserId} not found.`,
    );
  });
});
