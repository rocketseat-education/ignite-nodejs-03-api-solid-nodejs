import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface SearchManyByTitleParams {
  page: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchManyByTitle(
    title: string,
    params: SearchManyByTitleParams,
  ): Promise<Gym[]>
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
}
