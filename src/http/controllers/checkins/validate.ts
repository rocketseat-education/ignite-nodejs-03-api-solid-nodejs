import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkinParamsSchema.parse(request.params)

  // Call use case

  return reply.status(204).send()
}
