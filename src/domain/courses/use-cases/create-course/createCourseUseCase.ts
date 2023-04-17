import { CourseAlreadyExistsError } from '@errors/courses/courseAlreadyExistsError';

import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';

interface IRequest {
  user_id: string;
  name: string;
  description?: string;
  date_start: Date;
  date_end?: Date;
  duration?: number;
  institution?: string;
  institution_url?: string;
  location?: string;
  certificate?: boolean;
  notes?: string;
  cover_image?: string;
  thumbnail?: string;
  course_area?: string;
}

interface IResponse {
  course: UserCourse;
}

export class CreateCourseUseCase {
  constructor(private courseRepository: IUserCoursesRepository) {}

  async execute({
    name,
    user_id,
    description,
    date_start,
    date_end,
    duration,
    institution,
    institution_url,
    location,
    certificate,
    notes,
    cover_image,
    thumbnail,
    course_area,
  }: IRequest): Promise<IResponse> {
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
      description,
      date_start,
      date_end,
      duration,
      institution,
      institution_url,
      location,
      certificate,
      notes,
      cover_image,
      thumbnail,
      course_area,
    });

    await this.courseRepository.create(createdCourse);

    return {
      course: createdCourse,
    };
  }
}
