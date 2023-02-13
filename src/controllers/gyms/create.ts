import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z
      .number()
      .refine((value) => isFinite(value) && Math.abs(value) <= 90),
    longitude: z
      .number()
      .refine((value) => isFinite(value) && Math.abs(value) <= 180),
  })

  const { title, description, phone, latitude, longitude } =
    createGymSchema.parse(request.body)

  return reply.status(201).send()
}
