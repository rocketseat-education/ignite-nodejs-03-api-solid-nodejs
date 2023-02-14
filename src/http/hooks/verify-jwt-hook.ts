import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWTHook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    if (env.NODE_ENV === 'test' && request.headers['x-request-member']) {
      request.user = {
        sub: String(request.headers['x-request-member']),
      }
      return
    }

    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
