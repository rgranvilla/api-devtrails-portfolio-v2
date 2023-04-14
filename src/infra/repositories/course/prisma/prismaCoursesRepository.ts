import { Course } from '@domain/courses/entities/course';

import { ICourseRepository } from '../ICourseRepository';

export class PrismaCourseRepository implements ICourseRepository {
  async findById(id: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  async findByName(name: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  async listAll(): Promise<Course[] | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async save(course: Course): Promise<Course> {
    throw new Error('Method not implemented.');
  }
  async create(course: Course): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
