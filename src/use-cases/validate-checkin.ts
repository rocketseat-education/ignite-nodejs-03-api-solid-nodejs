import dayjs from 'dayjs'
import { CheckInsRepository } from '@/repositories/checkins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'
import { MembersRepository } from '@/repositories/members-repository'
import { NoPermissionError } from './errors/no-permission-error'

interface ValidateCheckinUseCaseRequest {
  memberId: string
  checkInId: string
}

interface ValidateCheckinUseCaseResponse {}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    checkInId,
    memberId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const member = await this.membersRepository.findById(memberId)

    if (!member) {
      throw new ResourceNotFoundError()
    }

    if (member.role !== 'ADMIN') {
      throw new NoPermissionError()
    }

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {}
  }
}
