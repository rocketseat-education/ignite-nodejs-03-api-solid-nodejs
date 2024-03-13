import { DrizzleGymsRepository } from '@/repositories/drizzle/drizzle-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new DrizzleGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
