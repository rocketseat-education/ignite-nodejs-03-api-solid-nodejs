import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z
      .number()
      .finite()
      .refine((lat) => Math.abs(lat) <= 90),
    longitude: z
      .number()
      .finite()
      .refine((lng) => Math.abs(lng) <= 180),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGyms = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGyms.execute({
    latitude,
    longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
