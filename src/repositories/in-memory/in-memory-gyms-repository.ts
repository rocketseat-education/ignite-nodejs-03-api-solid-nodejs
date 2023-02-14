import { Prisma, Gym } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  FindManyNearbyParams,
  GymsRepository,
  SearchManyByTitleParams,
} from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance <= 10
    })
  }

  async searchManyByTitle(title: string, { page }: SearchManyByTitleParams) {
    return this.items
      .filter((item) => item.title.includes(title))
      .slice((page - 1) * 20, page * 20)
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
