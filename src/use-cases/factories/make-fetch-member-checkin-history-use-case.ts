import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { FetchMemberCheckInHistoryUseCase } from '../fetch-member-checkin-history'

export function makeFetchMemberCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchMemberCheckInHistoryUseCase(checkInsRepository)

  return useCase
}
