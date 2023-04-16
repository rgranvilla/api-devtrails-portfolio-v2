import { prisma } from '@database/lib';

import { CourseMapper } from '@mappers/course/courseMapper';

import { UserCourse } from '@domain/courses/entities/userCourse';

import { IUserCoursesRepository } from '../ICoursesRepository';

export class PrismaCoursesRepository implements IUserCoursesRepository {
  async findByUserId(user_id: string): Promise<UserCourse[] | null> {
    throw new Error('Method not implemented.');
  }

  async findById(course_id: string): Promise<UserCourse | null> {
    const existingCourse = await prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!existingCourse) {
      return null;
    }

    return CourseMapper.toDomain(existingCourse);
  }
  async findByName(name: string, user_id: string): Promise<UserCourse | null> {
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

  async listAll(): Promise<UserCourse[] | null> {
    throw new Error('Method not implemented.');
  }

  async delete(course_id: string): Promise<void> {
    await prisma.course.delete({ where: { id: course_id } });
  }

  async save(course_id: string, data: UserCourse): Promise<UserCourse> {
    const course = await prisma.course.update({
      where: { id: course_id },
      data: CourseMapper.toDatabase(data),
    });

    return CourseMapper.toDomain(course);
  }

  async create(course: UserCourse): Promise<void> {
    await prisma.course.create({ data: CourseMapper.toDatabase(course) });
  }
}
