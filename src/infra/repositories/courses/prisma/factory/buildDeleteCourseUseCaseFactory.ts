import { DeleteCourseUseCase } from '@domain/courses/use-cases/delete-course/deleteCourseUseCase';

import { PrismaCoursesRepository } from '../prismaCoursesRepository';

export function buildDeleteCourseUseCaseFactory() {
  const courseRepository = new PrismaCoursesRepository();
  const deleteCourseUseCase = new DeleteCourseUseCase(courseRepository);

  return deleteCourseUseCase;
}
