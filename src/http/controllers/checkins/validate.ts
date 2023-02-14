import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-checkin-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkinParamsSchema.parse(request.params)

  const validateCheckIn = makeValidateCheckInUseCase()

  await validateCheckIn.execute({
    checkInId,
  })

  return reply.status(204).send()
}
