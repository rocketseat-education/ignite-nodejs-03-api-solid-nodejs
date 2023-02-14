import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticate = makeAuthenticateUseCase()

  const { member } = await authenticate.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: member.id,
      },
    },
  )

  return reply.status(201).send({
    token,
  })
}
