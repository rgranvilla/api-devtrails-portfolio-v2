import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { CourseMapper } from '@mappers/course/courseMapper';

import { buildCreateCourseUseCaseFactory } from '@repositories/course/prisma/factory/buildCreateCourseUseCaseFactory';

export async function createCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCourseBodySchema = z.object({
    name: z.string(),
    user_id: z.string(),
    date_start: z.date(),
  });

  const { name, date_start, user_id } = createCourseBodySchema.parse(
    request.body,
  );

  try {
    const createCourseUseCase = buildCreateCourseUseCaseFactory();

    const { course } = await createCourseUseCase.execute({
      user_id,
      name,
      date_start,
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
