import { MembersRepository } from '@/repositories/members-repository'
import { Member } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetMemberProfileUseCaseRequest {
  memberId: string
}

interface GetMemberProfileUseCaseResponse {
  member: Member
}

export class GetMemberProfileUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    memberId,
  }: GetMemberProfileUseCaseRequest): Promise<GetMemberProfileUseCaseResponse> {
    const member = await this.membersRepository.findById(memberId)

    if (!member) {
      throw new ResourceNotFoundError()
    }

    return {
      member,
    }
  }
}
