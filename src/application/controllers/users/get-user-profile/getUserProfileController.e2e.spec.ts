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
      .get(`/users/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
  });
});
