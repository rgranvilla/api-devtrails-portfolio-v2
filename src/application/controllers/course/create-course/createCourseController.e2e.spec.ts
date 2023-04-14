import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

describe('Create Course (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should be able to create an course', async () => {
    const { id, token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post(`/${id}/courses/create`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript',
        date_start: new Date('June 15, 2022'),
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Javascript',
      }),
    );
  });
});
