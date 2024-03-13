import { db } from '@/lib/drizzle/connection'
import { GymInsert, gyms } from '@/lib/drizzle/schema'
import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/repositories/gyms-repository'
import { ilike, sql } from 'drizzle-orm'

export class DrizzleGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await db.query.gyms.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.id, id)
      },
    })

    if (!gym) return null

    return gym
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const result = await db
      .select()
      .from(gyms)
      .where(
        sql`( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`,
      )
      .execute()

    return result
  }

  async searchMany(query: string, page: number) {
    const result = await db
      .select()
      .from(gyms)
      .where(ilike(gyms.title, `%${query}%`))
      .offset((page - 1) * 20)
      .limit(20)
      .execute()

    return result
  }

  async create(data: GymInsert) {
    const [gym] = await db.insert(gyms).values(data).returning()

    return gym
  }
}
