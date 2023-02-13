import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
