import type { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // const user = request.user

  // call use case

  return reply.status(200).send()
}
