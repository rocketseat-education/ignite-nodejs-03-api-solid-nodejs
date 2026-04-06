import { CheckIn, Prisma } from "@prisma/client"

export interface CheckInsRepository {
    finByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}