import { DeleteCourseUseCase } from '@domain/courses/use-cases/delete-course/deleteCourseUseCase';

import { PrismaCourseRepository } from '../prismaCoursesRepository';

export function buildDeleteCourseUseCaseFactory() {
  const courseRepository = new PrismaCourseRepository();
  const deleteCourseUseCase = new DeleteCourseUseCase(courseRepository);

  return deleteCourseUseCase;
}
