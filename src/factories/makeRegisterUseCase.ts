import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { RegisterUseCase } from '@/use-cases/register'

export function makeRegisterUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const registerUseCase = new RegisterUseCase(membersRepository)

  return registerUseCase
}
