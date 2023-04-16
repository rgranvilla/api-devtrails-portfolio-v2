import { CreateCourseUseCase } from '@domain/courses/use-cases/create-course/createCourseUseCase';

import { PrismaCoursesRepository } from '../prismaCoursesRepository';

export function buildCreateCourseUseCaseFactory() {
  const courseRepository = new PrismaCoursesRepository();
  const createCourseUseCase = new CreateCourseUseCase(courseRepository);

  return createCourseUseCase;
}
