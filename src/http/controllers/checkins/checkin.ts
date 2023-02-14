import { makeCheckInUseCase } from '@/use-cases/factories/make-checkin-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  const checkIn = makeCheckInUseCase()

  await checkIn.execute({
    gymId,
    latitude,
    longitude,
    memberId: request.user.sub,
  })

  return reply.status(201).send()
}
