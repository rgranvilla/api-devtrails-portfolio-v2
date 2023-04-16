import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserCourse } from '@core/utils/tests/createUserCourse';

describe('Get All User Courses (e2e)', () => {
  let userData: {
    id: string;
    token: string;
  };

  beforeAll(async () => {
    await app.ready();

    userData = await createAndAuthenticateUser(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get all user courses', async () => {
    const firstRequest = await request(app.server)
      .get(`/${userData.id}/courses`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(firstRequest.status).toBe(200);
    expect(firstRequest.body).toHaveLength(0);

    await createUserCourse(app, userData.id, userData.token, {
      name: 'NodeJs',
      user_id: userData.id,
    });
    await createUserCourse(app, userData.id, userData.token, {
      name: 'HTML 5',
      user_id: userData.id,
    });

    const secondRequest = await request(app.server)
      .get(`/${userData.id}/courses`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(secondRequest.status).toBe(200);
    expect(secondRequest.body).toHaveLength(2);
    expect(secondRequest.body[0].name).toBe('NodeJs');
    expect(secondRequest.body[1].name).toBe('HTML 5');
  });

  // it('should throw error if user id doesnt exists', async () => {
  //   const wrongUserId = '123e4567-e89b-12d3-a456-426614174000';
  //   const result = await request(app.server)
  //     .get(`/${wrongUserId}/skills`)
  //     .set('Authorization', `Bearer ${userData.token}`)
  //     .send();
  //   const { message } = result.body;
  //   expect(result.status).toBe(404);
  //   expect(message).toBe(`The user with id ${wrongUserId} not found.`);
  // });
});
