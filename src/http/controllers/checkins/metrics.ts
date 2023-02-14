import { makeGetMemberMetricsUseCase } from '@/use-cases/factories/make-get-member-metrics-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getMemberMetrics = makeGetMemberMetricsUseCase()

  const { checkInsCount } = await getMemberMetrics.execute({
    memberId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
