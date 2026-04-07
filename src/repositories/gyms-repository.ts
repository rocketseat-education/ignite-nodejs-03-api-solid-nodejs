import { Gym, Prisma } from "@prisma/client"

export interface GymsRepository {
    searchMany(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(userId: string): Promise<Gym | null>
}