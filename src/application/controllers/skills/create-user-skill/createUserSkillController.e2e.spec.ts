import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { app } from '@app';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should be able to create an user', async () => {
    const response = await request(app.server).post('/users/create').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'johndoe@mail.com',
      }),
    );
  });
});
