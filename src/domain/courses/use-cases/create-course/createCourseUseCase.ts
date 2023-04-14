import { CourseAlreadyExistsError } from '@errors/courses/courseAlreadyExistsError';

import { ICourseRepository } from '@repositories/course/ICourseRepository';

import { Course } from '@domain/courses/entities/course';

interface IRequest {
  user_id: string;
  name: string;
  date_start: Date;
}

interface IResponse {
  course: Course;
}

export class CreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute({ name, user_id, date_start }: IRequest): Promise<IResponse> {
    const courseWithSameName = await this.courseRepository.findByName(
      user_id,
      name,
    );

    if (courseWithSameName) {
      throw new CourseAlreadyExistsError();
    }

    const createdCourse = new Course({
      name,
      user_id,
      date_start,
    });

    await this.courseRepository.create(createdCourse);

    return {
      course: createdCourse,
    };
  }
}
