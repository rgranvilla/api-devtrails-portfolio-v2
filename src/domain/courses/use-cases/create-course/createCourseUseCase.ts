import { CourseAlreadyExistsError } from '@errors/courses/courseAlreadyExistsError';

import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';

interface IRequest {
  user_id: string;
  name: string;
  date_start: Date;
}

interface IResponse {
  course: UserCourse;
}

export class CreateCourseUseCase {
  constructor(private courseRepository: IUserCoursesRepository) {}

  async execute({ name, user_id, date_start }: IRequest): Promise<IResponse> {
    const courseWithSameName = await this.courseRepository.findByName(
      user_id,
      name,
    );

    if (courseWithSameName) {
      throw new CourseAlreadyExistsError();
    }

    const createdCourse = new UserCourse({
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
