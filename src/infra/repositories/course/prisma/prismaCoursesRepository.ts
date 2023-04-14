import { prisma } from '@database/lib';

import { CourseMapper } from '@mappers/course/courseMapper';

import { Course } from '@domain/courses/entities/course';

import { ICourseRepository } from '../ICourseRepository';

export class PrismaCourseRepository implements ICourseRepository {
  async findById(id: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  async findByName(name: string, user_id: string): Promise<Course | null> {
    const existingCourse = await prisma.course.findFirst({
      where: {
        name,
        user_id,
      },
    });

    if (!existingCourse) {
      return null;
    }

    return CourseMapper.toDomain(existingCourse);
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
    await prisma.course.create({ data: CourseMapper.toDatabase(course) });
  }
}
