import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './errors/user-already-exist'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { randomUUID } from 'node:crypto'

// Abaixo tem uma interface, a interface é SÓ o contrato "O que o tipo 'CreateGymUseCaseRequest' deve conter?""
// A função mais a baixo 'CreateGymUseCase' recebe a implementação dessa interface, ou seja, recebe um objeto que precisa conter aquelas infos
interface CreateGymUseCaseRequest {
    title: string
    description?: string | null
    phone: string | null
    latitude: number
    longitude: number
}


interface CreateGymUseCaseResponse {
    gym: Gym
}
// Aqui está a função, o "caso de uso". Essa função recebe a interface acima, o "tipo", o "contrato"
// Essa função tem a logica de registro do usuario; é desacoplada do controller, ou seja, ela não ta nem ai pro http
// É uma função pura, recebe dados, processa e pronto. é isso que ela faz
// Fica claro que essa é a função de registro que será implementada em controllers que farão registro de usuarios
// O ideal é que ela seja desacoplada também do prisma, ou seja, ela nao deve saber e nem se importar com qual é o banco ou qualquer coisa assim

export class CreateGymUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymUseCaseRequest) {
        const newGym = await this.gymsRepository.create({
            id: randomUUID(),
            title,
            description,
            phone,
            latitude,
            longitude,
        })

        

        return { gym: newGym };

    }
}



