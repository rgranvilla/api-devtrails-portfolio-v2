import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

let adminToken: string;
let adminId: string;

describe('Update Role of an User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    const { token, id } = await createAndAuthenticateUser(app, true);
    adminToken = token;
    adminId = id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update role of an user', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Update Role',
      email: 'update-role@mail.com',
      password: '12345678',
    });

    const id = createdUser.body.id;

    const response = await request(app.server)
      .patch(`/users/update-role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        role: 'admin',
      });

    expect(response.body.user.role).toBe('admin');
  });

  it('should be able to logout if an user admin update yourself role', async () => {
    const response = await request(app.server)
      .patch(`/users/update-role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        role: 'subscriber',
      });

    expect(response.body.message).toBe(
      'Your user has been logged out. You need to perform a new login to proceed.',
    );
  });
});
