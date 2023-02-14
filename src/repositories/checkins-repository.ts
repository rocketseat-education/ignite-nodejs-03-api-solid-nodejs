import { CheckIn, Prisma } from '@prisma/client'

export interface FindManyByMemberIdParams {
  page: number
}

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  findManyByMemberId(
    memberId: string,
    params: FindManyByMemberIdParams,
  ): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(data: CheckIn): Promise<CheckIn>
  countByMemberId(memberId: string): Promise<number>
}
