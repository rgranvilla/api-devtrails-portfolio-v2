import { FastifyInstance } from 'fastify';

import { resetPasswordController } from '@controllers/users/reset-password/resetPasswordController';
import { sendForgotPasswordMailController } from '@controllers/users/send-forgot-password-mail/sendForgotPasswordMailController';

export async function passwordRoutes(app: FastifyInstance) {
  app.post('/users/forgot-password', sendForgotPasswordMailController);
  app.post('/users/reset-password', resetPasswordController);
}
