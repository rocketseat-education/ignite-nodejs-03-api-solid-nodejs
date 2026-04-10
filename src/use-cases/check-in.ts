import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/http/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

// Sempre bom esperar tipagem de entrada e saida

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
};

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private GymsRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.GymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFound()
        }

        const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        // calculate distance between user and gym

        const checkInOnSameDate = await this.checkInsRepository.finByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn,
        }

    }

}