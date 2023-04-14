import { CourseMapper, ICourseProps } from '@mappers/course/courseMapper';

import { Course } from '@domain/courses/entities/course';

import { ICourseRepository } from '../ICourseRepository';

export class InMemoryCourseRepository implements ICourseRepository {
  findById(id: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Course | null> {
    const existingCourse = this.items.find((item) => item.name === name);

    if (!existingCourse) {
      return null;
    }

    const parsedCourse = CourseMapper.toDomain(existingCourse);

    return parsedCourse;
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
  async create(course: Course): Promise<void> {
    this.items.push(CourseMapper.toDatabase(course));
  }
  public items: ICourseProps[] = [];
}
