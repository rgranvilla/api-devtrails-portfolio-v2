import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { createNewUserCourseFactory } from '@factories/courses/createNewUserCourseFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';
import { InMemoryCoursesRepository } from '@repositories/courses/in-memory/inMemoryCoursesRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';
import { User } from '@domain/users/entities/user';

import { ListAllUserCoursesUseCase } from './listAllCourseUseCase';

let sut: ListAllUserCoursesUseCase;
let usersRepository: IUsersRepository;
let userCoursesRepository: IUserCoursesRepository;

let user: User;
let firstCourse: UserCourse;
let secondCourse: UserCourse;

describe('List All User Course Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userCoursesRepository = new InMemoryCoursesRepository();
    sut = new ListAllUserCoursesUseCase(userCoursesRepository);

    user = await createNewUserFactory();
    await usersRepository.create(user);

    firstCourse = await createNewUserCourseFactory({
      course_id: randomUUID(),
      user_id: user.id,
      override: {
        name: 'Javascript',
      },
    });

    secondCourse = await createNewUserCourseFactory({
      course_id: randomUUID(),
      user_id: user.id,
      override: {
        name: 'Typescript',
      },
    });

    await userCoursesRepository.create(firstCourse);
    await userCoursesRepository.create(secondCourse);
  });

  it('should be able to show all user courses', async () => {
    const user_id = user.id;

    const { userCourses } = await sut.execute({
      user_id,
    });

    expect(userCourses).toHaveLength(2);
    if (userCourses) {
      expect(userCourses[0].id).toBe(firstCourse.id);
      expect(userCourses[1].id).toBe(secondCourse.id);
    }
  });
});
