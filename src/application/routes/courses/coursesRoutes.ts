import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@core/middlewares/verifyJWT';

import { createCourseController } from '@controllers/courses/create-course/createCourseController';
import { deleteCourseController } from '@controllers/courses/delete-course/deleteCourseController';
import { updateCourseController } from '@controllers/courses/update-course/updateCourseController';

export async function courseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/:user_id/courses/create', createCourseController);

  app.patch('/:user_id/courses/:course_id/update', updateCourseController);

  app.delete('/:user_id/courses/:course_id/delete', deleteCourseController);
}
