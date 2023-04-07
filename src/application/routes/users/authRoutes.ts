import { FastifyInstance } from 'fastify';

import { authenticateUserController } from '@controllers/users/authenticate/authenticateUserController';
import { logoutController } from '@controllers/users/logout/logoutController';
import { refreshTokenController } from '@controllers/users/refresh-token/refreshTokenController';

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions/auth', authenticateUserController);

  app.patch('/sessions/refresh', refreshTokenController);

  app.post('/sessions/logout', logoutController);
}
