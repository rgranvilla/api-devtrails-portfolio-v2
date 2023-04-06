/* eslint-disable @typescript-eslint/naming-convention */
import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'admin' | 'creator' | 'subscriber';
      sub: string;
    };
  }
}
