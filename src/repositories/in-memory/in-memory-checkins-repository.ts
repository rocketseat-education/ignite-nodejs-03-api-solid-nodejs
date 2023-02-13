import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  CheckInsRepository,
  FindManyByMemberIdParams,
} from '../checkins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findManyByMemberId(
    memberId: string,
    { page }: FindManyByMemberIdParams,
  ) {
    const checkIns = this.items
      .filter((item) => item.member_id === memberId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByMemberId(memberId: string) {
    const checkIns = this.items.filter((item) => item.member_id === memberId)

    return checkIns.length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      ...data,
      id: data.id ?? randomUUID(),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      validated_at: data.validated_at
        ? new Date(data.validated_at)
        : new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
