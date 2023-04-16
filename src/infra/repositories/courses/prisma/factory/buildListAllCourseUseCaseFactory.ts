import { ListAllUserCoursesUseCase } from '@domain/courses/use-cases/list-all-course/listAllCourseUseCase';

import { PrismaCoursesRepository } from '../prismaCoursesRepository';

export function buildListAllCourseUseCaseFactory() {
  const courseRepository = new PrismaCoursesRepository();
  const listAllUserCourseUseCase = new ListAllUserCoursesUseCase(
    courseRepository,
  );

  return listAllUserCourseUseCase;
}
