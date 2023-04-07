import { compare } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

let adminToken: string;
let adminId: string;

describe('Update Password of an User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    const { token, id } = await createAndAuthenticateUser(app, true);
    adminToken = token;
    adminId = id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update password of an user', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Update Job Title',
      email: 'update-job-title@mail.com',
      password: '12345678',
    });

    const id = createdUser.body.id;

    const response = await request(app.server)
      .patch(`/users/${id}/update-password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        password: 'new-password',
      });

    const { newPassword } = response.body;

    const passwordUpdatedMatched = await compare('new-password', newPassword);

    expect(passwordUpdatedMatched).toBeTruthy();
  });

  it('should be throw error with user doesnt exists', async () => {
    const inexistentUserId = '123e4567-e89b-12d3-a456-426614174000';

    const response = await request(app.server)
      .patch(`/users/${inexistentUserId}/update-password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        password: 'new-password',
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Resource not found.');
  });
});
