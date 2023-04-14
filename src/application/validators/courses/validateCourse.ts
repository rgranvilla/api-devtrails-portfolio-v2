import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { ICourseRepository } from '@repositories/course/ICourseRepository';

export async function validateCourse(
  course_id: string,
  coursesRepository: ICourseRepository,
) {
  const existingCourse = await coursesRepository.findById(course_id);

  if (!existingCourse) {
    throw new ResourceNotFoundError();
  }

  return existingCourse;
}
