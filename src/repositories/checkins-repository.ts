import { CheckIn, Prisma } from '@prisma/client'

export interface FindManyByMemberIdParams {
  page: number
}

export interface CheckInsRepository {
  findManyByMemberId(
    memberId: string,
    params: FindManyByMemberIdParams,
  ): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByMemberId(memberId: string): Promise<number>
}
