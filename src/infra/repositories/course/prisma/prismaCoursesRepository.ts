import { Course } from '@domain/courses/entities/course';

import { ICourseRepository } from '../ICourseRepository';

export class PrismaCourseRepository implements ICourseRepository {
  findById(id: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  listAll(): Promise<Course[] | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  save(course: Course): Promise<Course> {
    throw new Error('Method not implemented.');
  }
  create(course: Course): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
