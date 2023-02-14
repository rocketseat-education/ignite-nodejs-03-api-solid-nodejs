import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import {
  FindManyNearbyParams,
  GymsRepository,
  SearchManyByTitleParams,
} from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    if (!gym) {
      return null
    }

    return gym
  }

  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    // TODO: Implement this with haversine

    throw new Error('Method not implemented.')
  }

  async searchManyByTitle(
    title: string,
    { page }: SearchManyByTitleParams,
  ): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
