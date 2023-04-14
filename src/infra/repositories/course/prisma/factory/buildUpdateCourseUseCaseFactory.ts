import { UpdateCourseUseCase } from '@domain/courses/use-cases/update-course/updateCourseUseCase';

import { PrismaCourseRepository } from '../prismaCoursesRepository';

export function buildUpdateCourseUseCaseFactory() {
  const courseRepository = new PrismaCourseRepository();
  const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);

  return updateCourseUseCase;
}
