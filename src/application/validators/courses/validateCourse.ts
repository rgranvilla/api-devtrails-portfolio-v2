import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { IUserCoursesRepository } from '@repositories/course/IUserCoursesRepository';

export async function validateCourse(
  course_id: string,
  coursesRepository: IUserCoursesRepository,
) {
  const existingCourse = await coursesRepository.findById(course_id);

  if (!existingCourse) {
    throw new ResourceNotFoundError();
  }

  return existingCourse;
}
