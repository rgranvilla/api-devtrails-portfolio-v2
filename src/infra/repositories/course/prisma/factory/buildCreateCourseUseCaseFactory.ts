import { CreateCourseUseCase } from '@domain/courses/use-cases/create-course/createCourseUseCase';

import { PrismaCourseRepository } from '../prismaCoursesRepository';

export function buildCreateCourseUseCaseFactory() {
  const courseRepository = new PrismaCourseRepository();
  const createCourseUseCase = new CreateCourseUseCase(courseRepository);

  return createCourseUseCase;
}
