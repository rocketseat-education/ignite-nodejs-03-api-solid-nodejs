import { DrizzleCheckInsRepository } from '@/repositories/drizzle/drizzle-check-ins-repository'
import { DrizzleGymsRepository } from '@/repositories/drizzle/drizzle-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new DrizzleCheckInsRepository()
  const gymsRepository = new DrizzleGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
