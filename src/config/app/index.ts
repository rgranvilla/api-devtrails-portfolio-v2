import { env } from '@env';

import packageJson from '../../../package.json';

export const appConfig = {
  version: packageJson.version,
  jwt: {
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
  },
  cors: {
    origin: true, // Allow all origins
  },
  swagger: {
    options: {
      openapi: {
        info: {
          title: 'Api Devtrails Portfolio V2 Documantation',
          description:
            'This documentation contains a comprehensive list of all API routes.',
          version: packageJson.version,
        },
      },
    },
    uiOptions: {
      routePrefix: '/api-docs',
      deepLinking: false,
    },
  },
};
