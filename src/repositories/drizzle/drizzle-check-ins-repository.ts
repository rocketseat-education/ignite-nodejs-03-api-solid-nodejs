import { db } from '@/lib/drizzle/connection'
import { CheckIn, CheckInInsert, checkIns } from '@/lib/drizzle/schema'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'
import { count, eq } from 'drizzle-orm'

export class DrizzleCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await db.query.checkIns.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.id, id)
      },
    })

    if (!checkIn) return null

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await db.query.checkIns.findFirst({
      where: (fields, { and, gte, lte, eq }) => {
        return and(
          eq(fields.user_id, userId),
          gte(fields.created_at, startOfTheDay.toDate()),
          lte(fields.created_at, endOfTheDay.toDate()),
        )
      },
    })

    if (!checkIn) return null

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const result = await db
      .select()
      .from(checkIns)
      .where(eq(checkIns.user_id, userId))
      .offset((page - 1) * 20)
      .limit(20)
      .execute()

    return result
  }

  async countByUserId(userId: string) {
    const [result] = await db
      .select({ count: count() })
      .from(checkIns)
      .where(eq(checkIns.user_id, userId))

    return result.count
  }

  async create(data: CheckInInsert) {
    const [checkIn] = await db.insert(checkIns).values(data).returning()

    return checkIn
  }

  async save(data: CheckIn) {
    const [checkIn] = await db
      .update(checkIns)
      .set(data)
      .where(eq(checkIns.id, data.id))
      .returning()

    return checkIn
  }
}
