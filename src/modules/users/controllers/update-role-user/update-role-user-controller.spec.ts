import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@modules/users/utils/test/create-and-authenticate-user';

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
      .patch(`/users/${id}/update-role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        role: 'admin',
      });

    expect(response.body.user.role).toBe('admin');
  });

  it('should be able to logout if an user admin update yourself role', async () => {
    const response = await request(app.server)
      .patch(`/users/${adminId}/update-role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        role: 'subscriber',
      });

    expect(response.body.message).toBe(
      'Your user has been logged out. You need to perform a new login to proceed.',
    );
  });

  it('should throw error if resource not found', async () => {
    const inexistentUserId = '123e4567-e89b-12d3-a456-426614174000';

    const response = await request(app.server)
      .patch(`/users/${inexistentUserId}/update-role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'changed name',
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Resource not found.');
  });
});
