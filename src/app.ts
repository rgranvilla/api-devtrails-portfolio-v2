import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from '@env';

import { appRoutes } from '@routes/index';

import packageJson from '../package.json';

const appVersion = packageJson.version;

export const app = fastify();

app.register(fastifyCors, {
  origin: true, // Allow all origins
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Api Devtrails Portfolio V2 Documantation',
      description:
        'This documentation contains a comprehensive list of all API routes.',
      version: appVersion,
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
  uiConfig: {
    deepLinking: false,
  },
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
  decode: {
    complete: true,
  },
});

app.register(fastifyCookie);

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  } else {
    //TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
