import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";


interface GetUserMetricsUseCaseRequest {
    userId: string;
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number;
}


export class GetUserMetricsUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {

        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }

    }

}