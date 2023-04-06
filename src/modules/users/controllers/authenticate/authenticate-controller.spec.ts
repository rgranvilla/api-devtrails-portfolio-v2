import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users/create').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const response = await request(app.server).post('/sessions/auth').send({
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should be able to throw an error on authenticate with wrong credentials', async () => {
    await request(app.server).post('/users/create').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const response = await request(app.server).post('/sessions/auth').send({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Invalid credentials.' });
  });
});
