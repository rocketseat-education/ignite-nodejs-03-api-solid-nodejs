import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { ValidateCheckInUseCase } from '../validate-checkin'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const membersRepository = new PrismaMembersRepository()

  const useCase = new ValidateCheckInUseCase(
    checkInsRepository,
    membersRepository,
  )

  return useCase
}
