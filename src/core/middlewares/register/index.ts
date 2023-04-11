import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { fastifyMultipart } from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

import { auth } from '@config/auth';
import { upload } from '@config/upload/avatar';

import { appRoutes } from '@routes/index.js';

import packageJson from '../../../../package.json';

const { secret_token, expires_in_token } = auth;
export const uploadAvatar = upload.single('avatar');

export function registerMiddlewares(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
    allowedHeaders: '*',
  });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Api Devtrails Portfolio V2 Documantation',
        description:
          'This documentation contains a comprehensive list of all API routes.',
        version: packageJson.version,
      },
    },
  });
  app.register(fastifyMultipart, { limits: { fileSize: 600000 } });
  app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
    uiConfig: {
      deepLinking: true,
    },
  });

  app.register(fastifyJwt, {
    secret: secret_token,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: expires_in_token,
    },
    decode: {
      complete: true,
    },
  });

  app.register(fastifyCookie);
  app.register(appRoutes);
}
