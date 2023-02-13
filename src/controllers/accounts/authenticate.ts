import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/factories/makeAuthenticateUseCase'

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

  const { account } = await authenticate.execute({
    email,
    password,
  })

  const token = reply.jwtSign(
    { email: account.email },
    {
      sign: {
        sub: account.id,
      },
    },
  )

  return reply.status(201).send({
    token,
  })
}
