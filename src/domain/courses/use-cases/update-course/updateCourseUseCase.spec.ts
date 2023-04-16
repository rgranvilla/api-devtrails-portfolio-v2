import { beforeEach, describe, expect, it } from 'vitest';

import { createNewUserCourseFactory } from '@factories/courses/createNewUserCourseFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { IUpdateCourseDTO } from '@dtos/courses/IUpdateCourseDto';

import { InMemoryCoursesRepository } from '@repositories/courses/in-memory/inMemoryCoursesRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';
import { User } from '@domain/users/entities/user';

import { UpdateCourseUseCase } from './updateCourseUseCase';

let usersRepository: InMemoryUsersRepository;
let courseRepository: InMemoryCoursesRepository;
let sut: UpdateCourseUseCase;
let user: User;
let userCourse: UserCourse;

describe('Update Course Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    courseRepository = new InMemoryCoursesRepository();
    sut = new UpdateCourseUseCase(courseRepository);

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

  it('should be able to update an course', async () => {
    const dataToUpdate: IUpdateCourseDTO = {
      name: 'Basics of Javascript',
      date_start: new Date('June 15, 2020'),
      description: 'Short description of course basics of javascript',
      course_area: 'Basics',
      location: 'Remote',
    };

    const result = await sut.execute({
      course_id: userCourse.id,
      data: dataToUpdate,
    });

    expect(result.course.id).toBe(userCourse.id);
    expect(result.course.name).toBe('Basics of Javascript');
    expect(result.course.description).toBe(
      'Short description of course basics of javascript',
    );
    expect(result.course.course_area).toBe('Basics');
    expect(result.course.location).toBe('Remote');
    expect(result.course.date_start).toEqual(new Date('June 15, 2020'));
  });
});
