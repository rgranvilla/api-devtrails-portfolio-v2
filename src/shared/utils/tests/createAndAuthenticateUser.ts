import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { prisma } from '@database/lib';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const role: 'admin' | 'subscriber' | 'creator' = isAdmin
    ? 'admin'
    : 'subscriber';

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('12345678', 6),
      role,
    },
  });

  const authResponse = await request(app.server).post('/sessions/auth').send({
    email: 'johndoe@example.com',
    password: '12345678',
  });

  const { token, refreshToken } = authResponse.body;

  return {
    token,
    refreshToken,
    id: user.id,
  };
}
