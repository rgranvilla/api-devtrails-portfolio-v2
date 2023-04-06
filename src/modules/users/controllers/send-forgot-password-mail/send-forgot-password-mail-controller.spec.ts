import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

describe('Send Forgot Password Mail (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to reset a password', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Reset Password',
      email: 'reset-password@mail.com',
      password: '12345678',
    });

    const { email } = createdUser.body;

    const response = await request(app.server)
      .post('/users/forgot-password')
      .send({ email });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});
