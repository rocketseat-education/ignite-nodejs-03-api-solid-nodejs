import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = []

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async findManyByUserId(userId: string, page: number) {
        return this.items
            .filter(item => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }

    async countByUserId(userId: string) {
        return this.items.filter(item => item.user_id === userId).length
    }

    async finByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('day')
        const endOfTheDay = dayjs(date).endOf('day')

        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,

            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
} 