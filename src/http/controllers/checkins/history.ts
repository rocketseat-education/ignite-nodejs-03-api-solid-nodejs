import { makeFetchMemberCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-member-checkin-history-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = historyQuerySchema.parse(request.query)

  const fetchMemberCheckInHistory = makeFetchMemberCheckInHistoryUseCase()

  const { checkIns } = await fetchMemberCheckInHistory.execute({
    memberId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
