import { validateCourse } from 'src/application/validators/courses/validateCourse';

import { IUpdateCourseDTO } from '@dtos/courses/IUpdateCourseDto';

import { ICourseRepository } from '@repositories/course/ICourseRepository';

import { Course } from '@domain/courses/entities/course';

interface IRequest {
  course_id: string;
  data: Partial<IUpdateCourseDTO>;
}

interface IResponse {
  course: Course;
}

export class UpdateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute({ course_id, data }: IRequest): Promise<IResponse> {
    const existingCourse = await validateCourse(
      course_id,
      this.courseRepository,
    );

    const courseToUpdate = new Course(
      {
        user_id: existingCourse.user_id,
        name: data.name ?? existingCourse.name,
        description: data.description ?? existingCourse.description,
        course_url: data.course_url ?? existingCourse.course_url,
        date_start: data.date_start ?? existingCourse.date_start,
        date_end: data.date_end ?? existingCourse.date_end,
        duration: data.duration ?? existingCourse.duration,
        institution: data.institution ?? existingCourse.institution,
        institution_url: data.institution_url ?? existingCourse.institution_url,
        location: data.location ?? existingCourse.location,
        certificate: data.certificate ?? existingCourse.certificate,
        notes: data.notes ?? existingCourse.notes,
        cover_image: data.cover_image ?? existingCourse.cover_image,
        thumbnail: data.thumbnail ?? existingCourse.thumbnail,
        course_area: data.course_area ?? existingCourse.course_area,
        created_at: existingCourse.created_at,
        updated_at: existingCourse.updated_at,
      },
      course_id,
    );

    const updatedCourse = await this.courseRepository.save(
      course_id,
      courseToUpdate,
    );

    return {
      course: updatedCourse,
    };
  }
}
