import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@core/middlewares/verifyJWT';

import { createCourseController } from '@controllers/course/create-course/createCourseController';

export async function courseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/:users_id/courses/create', createCourseController);
}
