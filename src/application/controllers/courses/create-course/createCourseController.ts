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
  });

  const createCourseUserSchema = z.object({
    sub: z.string().uuid(),
  });

  const { name, date_start } = createCourseBodySchema.parse(request.body);

  const { sub: user_id } = createCourseUserSchema.parse(request.user);

  try {
    const createCourseUseCase = buildCreateCourseUseCaseFactory();

    const { course } = await createCourseUseCase.execute({
      user_id,
      name,
      date_start: new Date(date_start),
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
