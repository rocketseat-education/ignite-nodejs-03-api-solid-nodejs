import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUsers(app: FastifyInstance, isAdmin = false) {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })
    const authResponse = await request(app.server).post('/sessions').send({
        email: 'johndoe@email.com',
        password: '123456'
    })

    const { token } = authResponse.body

    return { token }
}