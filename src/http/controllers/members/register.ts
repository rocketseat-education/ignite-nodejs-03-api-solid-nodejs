import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/makeRegisterUseCase'
import { MemberAlreadyExistsError } from '@/use-cases/errors/member-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const register = makeRegisterUseCase()

  try {
    await register.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof MemberAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
