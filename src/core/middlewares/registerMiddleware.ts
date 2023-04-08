import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

import { appConfig } from '@config/app';

import { appRoutes } from '@routes/index.js';

export function registerMiddleware(app: FastifyInstance) {
  app.register(fastifyCors, appConfig.cors);
  app.register(fastifySwagger, appConfig.swagger.options);
  app.register(fastifySwaggerUi, appConfig.swagger.uiOptions);
  app.register(fastifyJwt, appConfig.jwt);
  app.register(fastifyCookie);
  app.register(appRoutes);
}
