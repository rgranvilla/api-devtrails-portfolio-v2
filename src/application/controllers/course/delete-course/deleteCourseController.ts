import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { buildDeleteCourseUseCaseFactory } from '@repositories/course/prisma/factory/buildDeleteCourseUseCaseFactory';

export async function deleteCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCourseParamsSchema = z.object({
    course_id: z.string().uuid(),
  });

  const { course_id } = deleteCourseParamsSchema.parse(request.params);

  try {
    const deleteCourseUseCase = buildDeleteCourseUseCaseFactory();

    await deleteCourseUseCase.execute({
      course_id,
    });

    return reply
      .status(200)
      .send({ message: `Course with id ${course_id} was deleted.` });
  } catch (err) {
    console.log(err);
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
