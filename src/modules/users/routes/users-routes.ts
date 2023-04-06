import { FastifyInstance } from 'fastify';
import { verifyJwt } from 'src/core/middlewares/verify-jwt';
import { verifyUserRole } from 'src/core/middlewares/verify-user-role';

import { createUserController } from '@modules/users/controllers/create-user/create-user-controller';

import { getUserProfileController } from '../controllers/get-profile/get-user-profile-controller';
import { updatePasswordUserController } from '../controllers/update-password-user/update-password-user-controller';
import { updateRoleUserController } from '../controllers/update-role-user/update-role-user-controller';
import { updateUserController } from '../controllers/update-user/update-user-controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/create', createUserController);
  app.get('/users/profile', { onRequest: verifyJwt }, getUserProfileController);

  app.patch(
    '/users/:userId/update-password',
    { onRequest: [verifyJwt] },
    updatePasswordUserController,
  );

  app.patch(
    '/users/:userId/update',
    { onRequest: [verifyJwt] },
    updateUserController,
  );

  app.patch(
    '/users/:userId/update-role',
    { onRequest: [verifyJwt, verifyUserRole('admin')] },
    updateRoleUserController,
  );
}
