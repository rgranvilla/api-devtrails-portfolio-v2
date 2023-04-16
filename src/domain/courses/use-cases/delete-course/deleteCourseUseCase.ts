import { validateCourse } from 'src/application/validators/courses/validateCourse';

import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';

interface IRequest {
  course_id: string;
}

export class DeleteCourseUseCase {
  constructor(private courseRepository: IUserCoursesRepository) {}

  async execute({ course_id }: IRequest): Promise<void> {
    await validateCourse(course_id, this.courseRepository);

    await this.courseRepository.delete(course_id);
  }
}
