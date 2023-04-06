import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

describe('Logout (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to logout', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'PERSON',
    });

    await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(app.server).post('/sessions/logout').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Logout realizado com sucesso',
    });
  });
});
