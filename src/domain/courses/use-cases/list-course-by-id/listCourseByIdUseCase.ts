import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';

interface IRequest {
  course_id: string;
}

interface IResponse {
  userCourse: UserCourse | null;
}

export class ListUserCourseByIdUseCase {
  constructor(private userCoursesRepository: IUserCoursesRepository) {}

  async execute({ course_id }: IRequest): Promise<IResponse> {
    const userCourse = await this.userCoursesRepository.findById(course_id);

    return {
      userCourse,
    };
  }
}
