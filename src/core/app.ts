import fastify from 'fastify';

import { errorHandler } from '@core/errors/errorHandler.js';
import { registerMiddleware } from '@core/middlewares/registerMiddleware';

export const app = fastify();

registerMiddleware(app);

app.setErrorHandler(errorHandler);
