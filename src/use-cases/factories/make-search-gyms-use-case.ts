import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"
import { FetchMembersCheckInsHistoryUseCase } from "../fetch-members-check-ins-history"
import { ValidateCheckInCase } from "../validate-check-in"
import { SearchGymUseCase } from "../search-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymUseCase(gymsRepository)

    return useCase
}