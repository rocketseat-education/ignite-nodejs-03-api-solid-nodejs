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
import dayjs from "dayjs";

// Sempre bom esperar tipagem de entrada e saida

interface ValidateCheckInCaseRequest {
    checkInId: string
}

interface ValidateCheckInCaseResponse {
    checkIn: CheckIn
};

export class ValidateCheckInCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ checkInId }: ValidateCheckInCaseRequest): Promise<ValidateCheckInCaseResponse> {

        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFound()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes",
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new Error()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn,
        }

    }

}