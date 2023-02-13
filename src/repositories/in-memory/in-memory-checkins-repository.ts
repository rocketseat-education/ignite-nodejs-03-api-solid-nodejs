import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CheckInsRepository } from '../checkins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      ...data,
      id: data.id ?? randomUUID(),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      validated_at: data.validated_at
        ? new Date(data.validated_at)
        : new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
