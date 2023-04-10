import fastify from 'fastify';

import { errorHandler } from '@core/errors/errorHandler.js';

import { registerMiddlewares } from './middlewares/register';

export const app = fastify();

registerMiddlewares(app);

app.setErrorHandler(errorHandler);
