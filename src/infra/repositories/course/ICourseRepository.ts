import { Course } from '@domain/courses/entities/course';

export abstract class ICourseRepository {
  abstract findById(id: string): Promise<Course | null>;
  abstract findByName(user_id: string, name: string): Promise<Course | null>;
  abstract listAll(): Promise<Course[] | null>;
  abstract delete(course_id: string): Promise<void>;
  abstract save(course_id: string, data: Course): Promise<Course>;
  abstract create(course: Course): Promise<void>;
}
