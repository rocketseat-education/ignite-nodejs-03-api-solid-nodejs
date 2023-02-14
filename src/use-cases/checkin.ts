import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { InvalidDistanceError } from './errors/invalid-distance-error'

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

    const distance = getDistanceBetweenCoordinates(
      { latitude, longitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE = 0.1 // 100m

    if (distance > MAX_DISTANCE) {
      throw new InvalidDistanceError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      member_id: memberId,
    })

    return {
      checkIn,
    }
  }
}
