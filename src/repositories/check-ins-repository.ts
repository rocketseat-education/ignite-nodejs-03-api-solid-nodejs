import { CheckIn, CheckInInsert } from '@/lib/drizzle/schema'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: CheckInInsert): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
