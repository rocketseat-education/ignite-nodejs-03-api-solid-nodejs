import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const useCase = new AuthenticateUseCase(membersRepository)

  return useCase
}
