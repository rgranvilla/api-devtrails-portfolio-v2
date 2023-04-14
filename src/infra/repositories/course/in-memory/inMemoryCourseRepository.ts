import { CourseMapper, ICourseProps } from '@mappers/course/courseMapper';

import { Course } from '@domain/courses/entities/course';

import { ICourseRepository } from '../ICourseRepository';

export class InMemoryCourseRepository implements ICourseRepository {
  public items: ICourseProps[] = [];

  async findById(course_id: string): Promise<Course | null> {
    const existingCourse = this.items.find((item) => item.id === course_id);

    if (!existingCourse) {
      return null;
    }

    return CourseMapper.toDomain(existingCourse);
  }

  async findByName(user_id: string, name: string): Promise<Course | null> {
    const existingCourse = this.items.find(
      (item) => item.name === name && item.user_id === user_id,
    );

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

  async save(course_id: string, data: Course): Promise<Course> {
    const userCourseIndex = this.items.findIndex(
      (item) => item.id === course_id,
    );

    const userCourseToUpdate = CourseMapper.toDatabase(data);

    this.items[userCourseIndex] = {
      ...userCourseToUpdate,
    };

    return CourseMapper.toDomain(this.items[userCourseIndex]);
  }
  async create(course: Course): Promise<void> {
    this.items.push(CourseMapper.toDatabase(course));
  }
}
