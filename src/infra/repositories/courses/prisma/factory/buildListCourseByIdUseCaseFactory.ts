import { ListUserCourseByIdUseCase } from '@domain/courses/use-cases/list-course-by-id/listCourseByIdUseCase';

import { PrismaCoursesRepository } from '../prismaCoursesRepository';

export function buildListCourseByIdUseCaseFactory() {
  const courseRepository = new PrismaCoursesRepository();
  const listUserCourseByIdUseCase = new ListUserCourseByIdUseCase(
    courseRepository,
  );

  return listUserCourseByIdUseCase;
}
