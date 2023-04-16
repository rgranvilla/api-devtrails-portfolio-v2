import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserCourse } from '@core/utils/tests/createUserCourse';

import { UserCourse } from '@domain/courses/entities/userCourse';

describe('Delete User Skill (e2e)', () => {
  let userCourseData: {
    course: UserCourse;
  };

  let userData: {
    id: string;
    token: string;
  };

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
    userCourseData = await createUserCourse(app, userData.id, userData.token);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete an user skill', async () => {
    const { course } = userCourseData;

    const result = await request(app.server)
      .delete(`/${userData.id}/courses/${course.id}/delete`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    expect(result.status).toBe(200);
  });

  it('should throw error if user skill id doesnt exists', async () => {
    const { id } = userData;
    const wrongCourseId = '123e4567-e89b-12d3-a456-426614174000';

    const result = await request(app.server)
      .delete(`/${id}/courses/${wrongCourseId}/delete`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send();

    const { message } = result.body;

    expect(result.status).toBe(409);
    expect(message).toBe(`Resource not found.`);
  });
});
