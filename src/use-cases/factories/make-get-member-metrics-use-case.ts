import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { GetMemberMetricsUseCase } from '../get-member-metrics'

export function makeGetMemberMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetMemberMetricsUseCase(checkInsRepository)

  return useCase
}
