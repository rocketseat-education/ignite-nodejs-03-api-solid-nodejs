import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { GetMemberProfileUseCase } from '@/use-cases/get-member-profile'

export function makeGetMemberProfileUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const useCase = new GetMemberProfileUseCase(membersRepository)

  return useCase
}
