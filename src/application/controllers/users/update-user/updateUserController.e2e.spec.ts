import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

let adminToken: string;
let adminId: string;

describe('Update User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    const { token, id } = await createAndAuthenticateUser(app, true);
    adminToken = token;
    adminId = id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update job_title of an user', async () => {
    const createdUser = await request(app.server).post('/users/create').send({
      name: 'Update Job Title',
      email: 'update-job-title@mail.com',
      password: '12345678',
    });

    const id = createdUser.body.id;

    const response = await request(app.server)
      .patch(`/users/update`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        job_title: 'Fullstack',
      });

    expect(response.body.user.job_title).toBe('Fullstack');
  });
});
