import { Gym } from "@prisma/client"

export interface GymsRepository {
    findById(userId: string): Promise<Gym | null>
}