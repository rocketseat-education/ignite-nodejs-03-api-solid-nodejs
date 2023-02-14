import { CheckInsRepository } from '@/repositories/checkins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckinUseCaseRequest {
  checkInId: string
}

interface ValidateCheckinUseCaseResponse {}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {}
  }
}
