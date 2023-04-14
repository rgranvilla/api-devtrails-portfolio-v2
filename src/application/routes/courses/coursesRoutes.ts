import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@core/middlewares/verifyJWT';

import { createCourseController } from '@controllers/course/create-course/createCourseController';
import { updateCourseController } from '@controllers/course/update-course/updateCourseController';

export async function courseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/:user_id/courses/create', createCourseController);

  app.patch('/:user_id/courses/:course_id/update', updateCourseController);
}
