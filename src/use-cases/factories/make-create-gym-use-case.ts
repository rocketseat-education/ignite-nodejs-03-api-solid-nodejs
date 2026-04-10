import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"
import { FetchMembersCheckInsHistoryUseCase } from "../fetch-members-check-ins-history"
import { ValidateCheckInCase } from "../validate-check-in"
import { SearchGymUseCase } from "../search-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}