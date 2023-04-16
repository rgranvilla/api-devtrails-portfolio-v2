import { validateCourse } from 'src/application/validators/courses/validateCourse';

import { ICourseRepository } from '@repositories/course/ICourseRepository';

interface IRequest {
  course_id: string;
}

export class DeleteCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute({ course_id }: IRequest): Promise<void> {
    await validateCourse(course_id, this.courseRepository);

    await this.courseRepository.delete(course_id);
  }
}
