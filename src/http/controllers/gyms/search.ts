import { makeSearchGymsUseCase } from '@/use-cases/factories/makeSearchGymsUseCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    q: z.string(),
    page: z.number().min(1).default(1),
  })

  const { q, page } = searchQuerySchema.parse(request.query)

  const searchGyms = makeSearchGymsUseCase()

  const { gyms } = await searchGyms.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
