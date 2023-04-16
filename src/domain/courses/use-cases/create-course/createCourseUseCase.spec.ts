import { beforeEach, describe, expect, it } from 'vitest';

import { CourseAlreadyExistsError } from '@errors/courses/courseAlreadyExistsError';

import { InMemoryCoursesRepository } from '@repositories/courses/in-memory/inMemoryCoursesRepository';

import { CreateCourseUseCase } from './createCourseUseCase';

let courseRepository: InMemoryCoursesRepository;
let sut: CreateCourseUseCase;

describe('Create Course Use Case', () => {
  beforeEach(() => {
    courseRepository = new InMemoryCoursesRepository();
    sut = new CreateCourseUseCase(courseRepository);
  });

  it('should be able to create na course', async () => {
    const { course } = await sut.execute({
      name: 'Javascript',
      date_start: new Date(),
      user_id: 'an user id',
    });

    expect(course.id).toEqual(expect.any(String));
  });

  it('should not be able to create an course with name already exists', async () => {
    const name = 'Javascript';

    await sut.execute({
      name,
      date_start: new Date(),
      user_id: 'an user id',
    });

    await expect(() =>
      sut.execute({
        name,
        date_start: new Date(),
        user_id: 'an user id',
      }),
    ).rejects.toBeInstanceOf(CourseAlreadyExistsError);
  });
});
