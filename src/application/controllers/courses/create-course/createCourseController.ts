import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { CourseMapper } from '@mappers/course/courseMapper';

import { buildCreateCourseUseCaseFactory } from '@repositories/courses/prisma/factory/buildCreateCourseUseCaseFactory';

export async function createCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCourseBodySchema = z.object({
    name: z.string(),
    date_start: z.string(),
    description: z.string().optional(),
    date_end: z.string().optional(),
    duration: z.number().optional(),
    institution: z.string().optional(),
    institution_url: z.string().optional(),
    location: z.string().optional(),
    certificate: z.boolean().optional(),
    notes: z.string().optional(),
    cover_image: z.string().optional(),
    thumbnail: z.string().optional(),
    course_area: z.string().optional(),
  });

  const createCourseUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const {
    name,
    date_start,
    date_end,
    description,
    duration,
    institution,
    institution_url,
    location,
    certificate,
    notes,
    cover_image,
    thumbnail,
    course_area,
  } = createCourseBodySchema.parse(request.body);

  const { sub: user_id } = createCourseUserSchema.parse(request.user);

  try {
    const createCourseUseCase = buildCreateCourseUseCaseFactory();

    const { course } = await createCourseUseCase.execute({
      user_id,
      name,
      description,
      date_start: new Date(date_start),
      date_end: date_end ? new Date(date_end) : undefined,
      duration,
      institution,
      institution_url,
      location,
      certificate,
      notes,
      cover_image,
      thumbnail,
      course_area,
    });

    const response = CourseMapper.toHttp(course);

    return reply.status(201).send({
      ...response,
    });
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
