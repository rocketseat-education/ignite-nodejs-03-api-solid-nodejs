import type { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  // const user = request.user

  // Call use case

  return reply.status(200).send()
}
