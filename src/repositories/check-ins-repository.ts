import { CheckIn, Prisma } from "@prisma/client"

export interface CheckInsRepository {
    countByUserId(userId: string): Promise<number>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    finByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}