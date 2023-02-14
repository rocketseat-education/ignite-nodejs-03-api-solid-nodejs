import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'

export function makeCheckInUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new CheckInUseCase(gymsRepository, checkInsRepository)

  return useCase
}
