import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUserCoursesRepository } from '@repositories/courses/ICoursesRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserCourse } from '@domain/courses/entities/userCourse';

interface IRequest {
  user_id: string;
}

interface IResponse {
  userCourses: UserCourse[] | null;
}

export class ListAllUserCoursesUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userCoursesRepository: IUserCoursesRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    await validateUserById(user_id, this.usersRepository);
    const userCourses = await this.userCoursesRepository.findByUserId(user_id);

    return {
      userCourses,
    };
  }
}
