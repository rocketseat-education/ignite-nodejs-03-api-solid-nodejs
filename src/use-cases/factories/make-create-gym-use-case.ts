import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const membersRepository = new PrismaMembersRepository()

  const useCase = new CreateGymUseCase(gymsRepository, membersRepository)

  return useCase
}
