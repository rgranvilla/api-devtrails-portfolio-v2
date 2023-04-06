import { FastifyInstance } from 'fastify';

import { resetPasswordController } from '@modules/users/controllers/reset-password/reset-password-controller';
import { sendForgotPasswordMailController } from '@modules/users/controllers/send-forgot-password-mail/send-forgot-password-mail-controller';

export async function passwordRoutes(app: FastifyInstance) {
  app.post('/users/forgot-password', sendForgotPasswordMailController);
  app.post('/users/reset-password', resetPasswordController);
}
