import { Prisma, Gym } from '@prisma/client'
import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items
  }

  async searchManyByTitle(title: string) {
    return this.items.filter((item) => item.title.includes(title))
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym: Gym = {
      ...data,
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }
}
