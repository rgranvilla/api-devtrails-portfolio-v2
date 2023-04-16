import { CourseMapper, IUserCourseProps } from '@mappers/course/courseMapper';

import { UserCourse } from '@domain/courses/entities/userCourse';

import { IUserCoursesRepository } from '../ICoursesRepository';

export class InMemoryCoursesRepository implements IUserCoursesRepository {
  public items: IUserCourseProps[] = [];

  async findByUserId(user_id: string): Promise<UserCourse[] | null> {
    const existingCourses = await this.items.filter(
      (item) => item.user_id === user_id,
    );

    if (!existingCourses) {
      return null;
    }

    const courses = existingCourses.map((course) =>
      CourseMapper.toDomain(course),
    );

    return courses;
  }

  async findById(course_id: string): Promise<UserCourse | null> {
    const existingCourse = this.items.find((item) => item.id === course_id);

    if (!existingCourse) {
      return null;
    }

    return CourseMapper.toDomain(existingCourse);
  }

  async findByName(user_id: string, name: string): Promise<UserCourse | null> {
    const existingCourse = this.items.find(
      (item) => item.name === name && item.user_id === user_id,
    );

    if (!existingCourse) {
      return null;
    }

    const parsedCourse = CourseMapper.toDomain(existingCourse);

    return parsedCourse;
  }

  listAll(): Promise<UserCourse[] | null> {
    throw new Error('Method not implemented.');
  }
  async delete(course_id: string): Promise<void> {
    const existingCourseIndex = await this.items.findIndex(
      (item) => item.id === course_id,
    );

    if (existingCourseIndex === -1) {
      return;
    }

    this.items.splice(existingCourseIndex, 1);
  }

  async save(course_id: string, data: UserCourse): Promise<UserCourse> {
    const userCourseIndex = this.items.findIndex(
      (item) => item.id === course_id,
    );

    const userCourseToUpdate = CourseMapper.toDatabase(data);

    this.items[userCourseIndex] = {
      ...userCourseToUpdate,
    };

    return CourseMapper.toDomain(this.items[userCourseIndex]);
  }
  async create(course: UserCourse): Promise<void> {
    this.items.push(CourseMapper.toDatabase(course));
  }
}
