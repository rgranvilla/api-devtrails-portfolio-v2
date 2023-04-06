import { randomUUID } from 'crypto';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

describe('Reset Password (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to reset password', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Reset Password',
      email: 'reset-mail@mail.com',
      password: '12345678',
    });

    const { email } = createdUser.body;

    const response = await request(app.server)
      .post('/users/forgot-password')
      .send({ email });

    const { token } = response.body;

    await request(app.server)
      .post(`/users/reset-password?token=${token}`)
      .send({
        password: '87654321',
      });

    const authenticatedUser = await request(app.server)
      .post('/sessions/auth')
      .send({
        email: 'reset-mail@mail.com',
        password: '87654321',
      });

    expect(authenticatedUser.body.token).toBeTruthy();
  });

  it('should not be able to reset password with wrong token', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Wrong Token Reset Password',
      email: 'wrong-token-reset-mail@mail.com',
      password: '12345678',
    });

    const { email } = createdUser.body;

    await request(app.server).post('/users/forgot-password').send({ email });

    const wrongToken = randomUUID();

    await request(app.server)
      .post(`/users/reset-password?token=${wrongToken}`)
      .send({
        password: '87654321',
      });

    const authenticatedUser = await request(app.server)
      .post('/sessions/auth')
      .send({
        email: 'wrong-token-reset-mail@mail.com',
        password: '87654321',
      });

    expect(authenticatedUser.body.message).toBe('Invalid credentials.');
  });
});
