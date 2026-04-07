import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";


interface FetchMembersCheckInsHistoryUseCaseRequest {
    userId: string;
    page: number;
}

interface FetchMembersCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}


export class FetchMembersCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId, page }: FetchMembersCheckInsHistoryUseCaseRequest): Promise<FetchMembersCheckInsHistoryUseCaseResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }

    }

}