import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { CheckIn, Prisma } from '@prisma/client'
import {
  CheckInsRepository,
  FindManyByMemberIdParams,
} from '../checkins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByMemberId(
    memberId: string,
    { page }: FindManyByMemberIdParams,
  ) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        member_id: memberId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findByMemberIdOnDate(memberId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        member_id: memberId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }

  async countByMemberId(memberId: string) {
    const count = await prisma.checkIn.count({
      where: {
        member_id: memberId,
      },
    })

    return count
  }
}
