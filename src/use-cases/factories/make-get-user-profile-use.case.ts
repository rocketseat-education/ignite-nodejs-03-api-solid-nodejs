import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
