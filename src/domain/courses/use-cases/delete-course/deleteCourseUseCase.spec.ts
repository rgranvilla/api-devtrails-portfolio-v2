import { beforeEach, describe, expect, it } from 'vitest';

import { createNewUserCourseFactory } from '@factories/courses/createNewUserCourseFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryCourseRepository } from '@repositories/course/in-memory/inMemoryCourseRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { Course } from '@domain/courses/entities/course';
import { User } from '@domain/users/entities/user';

import { DeleteCourseUseCase } from './deleteCourseUseCase';

let usersRepository: InMemoryUsersRepository;
let courseRepository: InMemoryCourseRepository;
let sut: DeleteCourseUseCase;
let user: User;
let userCourse: Course;

describe('Delete Course Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    courseRepository = new InMemoryCourseRepository();
    sut = new DeleteCourseUseCase(courseRepository);

    user = await createNewUserFactory();
    await usersRepository.create(user);

    userCourse = await createNewUserCourseFactory({
      course_id: user.id,
      user_id: user.id,
      override: {
        name: 'course_name',
        date_start: new Date('June 15, 2022'),
      },
    });
    await courseRepository.create(userCourse);
  });

  it('should be able to delete an course', async () => {
    const existingUserCourseBefore = await courseRepository.findById(
      userCourse.id,
    );

    expect(existingUserCourseBefore?.id).toBe(userCourse.id);

    await sut.execute({
      course_id: userCourse.id,
    });

    const existingUserCourseAfter = await courseRepository.findById(
      userCourse.id,
    );

    expect(existingUserCourseAfter).toBeNull();
  });
});
