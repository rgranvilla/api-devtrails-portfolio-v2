import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { CourseMapper } from '@mappers/course/courseMapper';

import { buildUpdateCourseUseCaseFactory } from '@repositories/course/prisma/factory/buildUpdateCourseUseCaseFactory';

export async function updateCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCourseParamsSchema = z.object({
    course_id: z.string().uuid(),
    user_id: z.string().uuid(),
  });

  const updateCourseBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    course_url: z.string().optional(),
    date_start: z.date().optional(),
    date_end: z.date().optional(),
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

  const { course_id } = updateCourseParamsSchema.parse(request.params);

  const dataCourseToUpdate = updateCourseBodySchema.parse(request.body);

  try {
    const updateCourseUseCase = buildUpdateCourseUseCaseFactory();

    const { course } = await updateCourseUseCase.execute({
      course_id,
      data: dataCourseToUpdate,
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
