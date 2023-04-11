import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { throwError } from '@core/errors/throwError';
import { uploadAvatar } from '@core/middlewares/register';
import { verifyJwt } from '@core/middlewares/verifyJWT';
import { verifyUserRole } from '@core/middlewares/verifyUserRole';

import { createUserController } from '@controllers/users/create-user/createUserController';
import { getUserProfileController } from '@controllers/users/get-user-profile/getUserProfileController';
import { updateUserAvatarController } from '@controllers/users/update-user-avatar/updateUserAvatarController';
import { updateUserPasswordController } from '@controllers/users/update-user-password/updateUserPasswordController';
import { updateUserRoleController } from '@controllers/users/update-user-role/updateUserRoleController';
import { updateUserController } from '@controllers/users/update-user/updateUserController';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/create', createUserController);
  app.get('/users/profile', { onRequest: verifyJwt }, getUserProfileController);

  app.patch(
    '/users/update-password',
    { onRequest: [verifyJwt] },
    updateUserPasswordController,
  );

  app.patch('/users/update', { onRequest: [verifyJwt] }, updateUserController);

  app.patch(
    '/users/update-role',
    { onRequest: [verifyJwt, verifyUserRole('admin')] },
    updateUserRoleController,
  );

  app.patch(
    '/users/update-avatar',
    {
      preHandler: [verifyJwt, uploadAvatar],
      errorHandler: (err, request: FastifyRequest, reply: FastifyReply) => {
        throwError(err, (status, message) => {
          return reply.status(status).send({ message });
        });
      },
    },
    updateUserAvatarController,
  );
}
