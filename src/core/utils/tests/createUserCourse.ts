import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { Course } from '@domain/courses/entities/course';

type Override = Partial<Course>;

export async function createUserCourse(
  app: FastifyInstance,
  user_id: string,
  token: string,
  override?: Override,
) {
  const response = await request(app.server)
    .post(`/${user_id}/courses/create`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: override?.name ?? 'course_name',
      description: override?.description ?? 'course_description',
      course_url: override?.course_url ?? 'http://course...',
      date_start: override?.date_start ?? new Date('January 1, 2023'),
      date_end: override?.date_end ?? new Date('February 1, 2023'),
      duration: override?.duration ?? 30,
      institution: override?.institution ?? 'Javascript Org',
      institution_url: override?.institution_url ?? 'http://institution...',
      location: override?.location ?? 'Location',
      certificate: override?.certificate ?? true,
      notes: override?.notes ?? 'Notes...',
      cover_image: override?.cover_image ?? 'http://cover-image...',
      thumbnail: override?.thumbnail ?? 'http://thumbnail...',
      course_area: override?.course_area ?? 'http://course-area...',
    });

  const course = response.body;

  return {
    course,
  };
}
