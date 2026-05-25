import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
    // Validação apenas
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send({ checkIns })

}
