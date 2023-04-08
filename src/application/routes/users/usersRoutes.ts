import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@core/middlewares/verifyJWT';
import { verifyUserRole } from '@core/middlewares/verifyUserRole';

import { createUserController } from '@controllers/users/create-user/createUserController';
import { getUserProfileController } from '@controllers/users/get-user-profile/getUserProfileController';
import { updateUserPasswordController } from '@controllers/users/update-user-password/updateUserPasswordController';
import { updateUserRoleController } from '@controllers/users/update-user-role/updateUserRoleController';
import { updateUserController } from '@controllers/users/update-user/updateUserController';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/create', createUserController);
  app.get(
    '/users/:user_id/profile',
    { onRequest: verifyJwt },
    getUserProfileController,
  );

  app.patch(
    '/users/:userId/update-password',
    { onRequest: [verifyJwt] },
    updateUserPasswordController,
  );

  app.patch(
    '/users/:userId/update',
    { onRequest: [verifyJwt] },
    updateUserController,
  );

  app.patch(
    '/users/:userId/update-role',
    { onRequest: [verifyJwt, verifyUserRole('admin')] },
    updateUserRoleController,
  );
}
