import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserCourse } from '@core/utils/tests/createUserCourse';

import { Course } from '@domain/courses/entities/course';

describe('Update Course (e2e)', () => {
  let userData: {
    id: string;
    token: string;
  };

  let userCourseData: {
    course: Course;
  };

  const dataToUpdate = {
    name: 'Typescript',
    description: 'Typescript course...',
    certificate: true,
  };

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
    userCourseData = await createUserCourse(app, userData.id, userData.token);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update a course', async () => {
    const { course } = userCourseData;

    const result = await request(app.server)
      .patch(`/${userData.id}/courses/${course.id}/update`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ ...dataToUpdate });

    expect(result.status).toBe(201);
    expect(result.body.name).toBe('Typescript');
    expect(result.body.description).toBe('Typescript course...');
    expect(result.body.certificate).toBe(true);
  });
});
