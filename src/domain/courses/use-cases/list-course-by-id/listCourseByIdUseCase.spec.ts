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

import { ListUserCourseByIdUseCase } from './listCourseByIdUseCase';

let sut: ListUserCourseByIdUseCase;
let usersRepository: IUsersRepository;
let userCoursesRepository: IUserCoursesRepository;

let user: User;
let firstCourse: UserCourse;
let secondCourse: UserCourse;

describe('List All User Course Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userCoursesRepository = new InMemoryCoursesRepository();
    sut = new ListUserCourseByIdUseCase(userCoursesRepository);

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
    const { userCourse } = await sut.execute({
      course_id: firstCourse.id,
    });

    expect(userCourse?.id).toBe(firstCourse.id);
    expect(userCourse?.name).toBe(firstCourse.name);
  });
});
