import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkins-repository'

interface FetchMemberCheckInHistoryUseCaseRequest {
  memberId: string
  page: number
}

interface FetchMemberCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
    page,
  }: FetchMemberCheckInHistoryUseCaseRequest): Promise<FetchMemberCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByMemberId(
      memberId,
      { page },
    )

    return {
      checkIns,
    }
  }
}
