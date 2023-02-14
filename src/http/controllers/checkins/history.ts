import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  // const user = request.user

  const historyQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = historyQuerySchema.parse(request.body)

  // Call use case

  return reply.status(200).send()
}
