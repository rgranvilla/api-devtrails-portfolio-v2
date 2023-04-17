import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserCourse } from '@core/utils/tests/createUserCourse';

import { UserCourse } from '@domain/courses/entities/userCourse';

describe('List User Course by course Id (e2e)', () => {
  let userData: {
    id: string;
    token: string;
  };

  let userCourseData: {
    course: UserCourse;
  };

  beforeAll(async () => {
    await app.ready();

    userData = await createAndAuthenticateUser(app);
    userCourseData = await createUserCourse(app, userData.id, userData.token, {
      user_id: userData.id,
      name: 'Javascript',
      description: 'This is a Javascript course description...',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list user course by course Id', async () => {
    const { course } = userCourseData;
    const firstRequest = await request(app.server)
      .get(`/${userData.id}/courses/${course.id}`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(firstRequest.status).toBe(200);
    expect(firstRequest.body.user_id).toBe(userData.id);
    expect(firstRequest.body.name).toBe('Javascript');
    expect(firstRequest.body.description).toBe(
      'This is a Javascript course description...',
    );
  });
});
