import { PrismaAccountsRepository } from '../repositories/prisma/prisma-accounts-repository'
import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const accountsRepository = new PrismaAccountsRepository()
  const registerUseCase = new RegisterUseCase(accountsRepository)

  return registerUseCase
}
