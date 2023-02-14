import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    page: z.number().min(1).default(1),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { page, latitude, longitude } = searchQuerySchema.parse(request.body)

  // Call use case

  return reply.status(200).send()
}
