import { GymsRepository } from '@/repositories/gyms-repository'
import { randomUUID } from 'node:crypto'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
    query: string
    page: number
}


interface SearchGymUseCaseResponse {
    gym: Gym[]
}

export class SearchGymUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async execute({
        query,
        page
    }: SearchGymUseCaseRequest) {
        const gyms = await this.gymsRepository.searchMany(query, page)

        return { gyms };
    }
}



