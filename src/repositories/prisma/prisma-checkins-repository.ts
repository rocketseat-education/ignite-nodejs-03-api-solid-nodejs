import { CheckIn, Prisma } from '@prisma/client'
import {
  CheckInsRepository,
  FindManyByMemberIdParams,
} from '../checkins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  findById(id: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  findManyByMemberId(
    memberId: string,
    params: FindManyByMemberIdParams,
  ): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  save(data: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  countByMemberId(memberId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
