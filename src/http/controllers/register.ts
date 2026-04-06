import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistError } from '@/use-cases/errors/user-already-exist'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Validação apenas
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)


  try {
    const registerUserCase = makeRegisterUseCase()

    const newUser = await registerUserCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send({ newUser })
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({error: err.message})
    }

    throw err;
  }
}
