import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/factories/makeRegisterUseCase'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const register = makeRegisterUseCase()

  await register.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send()
}
