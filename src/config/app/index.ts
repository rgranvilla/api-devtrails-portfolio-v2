import { auth } from '@config/auth';

import packageJson from '../../../package.json';

const { secret_token, expires_in_token } = auth;

export const appConfig = {
  version: packageJson.version,
  jwt: {
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
