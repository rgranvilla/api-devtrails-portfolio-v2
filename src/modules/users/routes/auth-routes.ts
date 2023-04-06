import { FastifyInstance } from 'fastify';

import { authenticateController } from '@modules/users/controllers/authenticate/authenticate-controller';
import { logout } from '@modules/users/controllers/logout/logout';
import { refreshTokenController } from '@modules/users/controllers/refresh-token/refresh-token-controller';

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions/auth', authenticateController);

  app.patch('/sessions/refresh', refreshTokenController);

  app.post('/sessions/logout', logout);
}
