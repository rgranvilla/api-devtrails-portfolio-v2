import { UpdateCourseUseCase } from '@domain/courses/use-cases/update-course/updateCourseUseCase';

import { PrismaCoursesRepository } from '../prismaCoursesRepository';

export function buildUpdateCourseUseCaseFactory() {
  const courseRepository = new PrismaCoursesRepository();
  const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);

  return updateCourseUseCase;
}
