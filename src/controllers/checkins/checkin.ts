import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function checkin(request: FastifyRequest, reply: FastifyReply) {
  const checkinParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkinBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  })

  const { gymId } = checkinParamsSchema.parse(request.params)
  const { latitude, longitude } = checkinBodySchema.parse(request.body)

  // Call use case

  return reply.status(201).send()
}
