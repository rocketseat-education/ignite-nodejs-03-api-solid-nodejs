import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { MembersRepository } from '@/repositories/members-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NoPermissionError } from './errors/no-permission-error'

interface CreateGymUseCaseRequest {
  memberId: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    memberId,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const member = await this.membersRepository.findById(memberId)

    if (!member) {
      throw new ResourceNotFoundError()
    }

    if (member.role !== 'ADMIN') {
      throw new NoPermissionError()
    }

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
