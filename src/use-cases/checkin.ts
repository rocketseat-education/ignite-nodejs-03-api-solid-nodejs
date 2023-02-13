import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  gymId: string
  memberId: string
  latitude: number
  longitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private gymsRepository: GymsRepository,
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    gymId,
    memberId,
    latitude,
    longitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // TODO: validate latitude & longitude

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      member_id: memberId,
    })

    return {
      checkIn,
    }
  }
}
