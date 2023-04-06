import { compare } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@modules/users/utils/test/create-and-authenticate-user';

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
});
