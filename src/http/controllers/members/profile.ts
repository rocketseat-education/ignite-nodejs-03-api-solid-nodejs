import { makeGetMemberProfileUseCase } from '@/use-cases/factories/make-get-member-profile-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getMemberProfile = makeGetMemberProfileUseCase()

  const profile = await getMemberProfile.execute({
    memberId: request.user.sub,
  })

  return reply.status(200).send({
    profile,
  })
}
