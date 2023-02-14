import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import {
  CheckInsRepository,
  FindManyByMemberIdParams,
} from '../checkins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByMemberId(
    memberId: string,
    { page }: FindManyByMemberIdParams,
  ) {
    const checkIns = this.items
      .filter((item) => item.member_id === memberId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async findByMemberIdOnDate(memberId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return item.member_id === memberId && isOnSameDate
    })

    if (!checkIn) {
      return null
    }

    return checkIn
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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
