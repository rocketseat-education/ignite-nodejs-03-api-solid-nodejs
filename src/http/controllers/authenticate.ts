import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    // Validação apenas
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)


    try {
        const authenticateUserCase = makeAuthenticateUseCase()

        const { user } = await authenticateUserCase.execute({
            email,
            password,
        })

        return reply.status(200).send({ user })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(409).send({ error: err.message })
        }

        throw err;
    }
}
