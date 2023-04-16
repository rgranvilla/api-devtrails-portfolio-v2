import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { throwError } from '@core/errors/throwError';

import { CourseMapper } from '@mappers/course/courseMapper';

import { buildListAllCourseUseCaseFactory } from '@repositories/courses/prisma/factory/buildListAllCourseUseCaseFactory';

export async function listAllUserCoursesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listAllUserCoursesParamsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = listAllUserCoursesParamsSchema.parse(request.params);

  try {
    const listAllUserCoursesUseCase = buildListAllCourseUseCaseFactory();

    const { userCourses } = await listAllUserCoursesUseCase.execute({
      user_id,
    });

    const parsedUserSkills = userCourses
      ? userCourses.map((course) => CourseMapper.toHttp(course))
      : [];

    return reply.status(200).send(parsedUserSkills);
  } catch (err) {
    throwError(err, (status, message) => {
      return reply.status(status).send({ message });
    });
  }
}
