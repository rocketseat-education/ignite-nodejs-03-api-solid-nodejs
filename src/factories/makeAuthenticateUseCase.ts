import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const accountsRepository = new PrismaAccountsRepository()
  const authenticateUseCase = new AuthenticateUseCase(accountsRepository)

  return authenticateUseCase
}
