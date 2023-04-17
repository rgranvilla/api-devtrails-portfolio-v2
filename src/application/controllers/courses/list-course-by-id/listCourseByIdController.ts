import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';
import { throwError } from '@core/errors/throwError';

import { CourseMapper } from '@mappers/course/courseMapper';

import { buildListCourseByIdUseCaseFactory } from '@repositories/courses/prisma/factory/buildListCourseByIdUseCaseFactory';

export async function listUserCourseByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listUserCourseByIdParamsSchema = z.object({
    course_id: z.string().uuid(),
  });

  const { course_id } = listUserCourseByIdParamsSchema.parse(request.params);

  try {
    const listUserCourseByIdUseCase = buildListCourseByIdUseCaseFactory();

    const { userCourse } = await listUserCourseByIdUseCase.execute({
      course_id,
    });

    if (!userCourse) {
      throw new ResourceNotFoundError();
    }

    const course = CourseMapper.toHttp(userCourse);

    return reply.status(200).send(course);
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
