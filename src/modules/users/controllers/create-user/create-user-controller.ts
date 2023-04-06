import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@modules/users/errors/user-already-exists-error';
import { UserMapper } from '@modules/users/mapper/user-mapper';
import { makeCreateUserUseCase } from '@modules/users/repositories/prisma/factories/make-user-use-case-factory';

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
    const createUserUseCase = makeCreateUserUseCase();

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
