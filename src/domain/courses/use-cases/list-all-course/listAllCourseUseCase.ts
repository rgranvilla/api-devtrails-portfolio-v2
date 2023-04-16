import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';

interface IRequest {
  user_id: string;
}

interface IResponse {
  userCourses: UserCourse[] | null;
}

export class ListAllUserCoursesUseCase {
  constructor(private userCoursesRepository: IUserCoursesRepository) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const userCourses = await this.userCoursesRepository.findByUserId(user_id);

    return {
      userCourses,
    };
  }
}
