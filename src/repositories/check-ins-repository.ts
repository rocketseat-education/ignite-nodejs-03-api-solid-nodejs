import { CheckIn, Prisma } from "@prisma/client"

export interface CheckInsRepository {
    findById(CheckInId: string): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    finByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    save(checkIn: CheckIn): Promise<CheckIn>
}