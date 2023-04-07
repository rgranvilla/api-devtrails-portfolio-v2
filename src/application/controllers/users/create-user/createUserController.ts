import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@errors/users/userAlreadyExistsError';

import { UserMapper } from '@mappers/users/userMapper';

import { buildCreateUserUseCaseFactory } from '@repositories/users/prisma/factories/buildCreateUserUseCaseFactory';

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const createUserUseCase = buildCreateUserUseCaseFactory();

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const response = UserMapper.toHttp(user);

    return reply.status(201).send({
      ...response,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
