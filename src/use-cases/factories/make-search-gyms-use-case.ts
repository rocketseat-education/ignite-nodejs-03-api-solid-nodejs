import { DrizzleGymsRepository } from '@/repositories/drizzle/drizzle-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new DrizzleGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
