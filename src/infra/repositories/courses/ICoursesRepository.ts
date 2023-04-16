import { UserCourse } from '@domain/courses/entities/userCourse';

export abstract class IUserCoursesRepository {
  abstract findById(id: string): Promise<UserCourse | null>;
  abstract findByUserId(user_id: string): Promise<UserCourse[] | null>;
  abstract findByName(
    user_id: string,
    name: string,
  ): Promise<UserCourse | null>;
  abstract listAll(): Promise<UserCourse[] | null>;
  abstract delete(course_id: string): Promise<void>;
  abstract save(course_id: string, data: UserCourse): Promise<UserCourse>;
  abstract create(course: UserCourse): Promise<void>;
}
