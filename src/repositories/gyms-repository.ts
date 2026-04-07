import { Gym, Prisma } from "@prisma/client"

export interface GymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(userId: string): Promise<Gym | null>
}