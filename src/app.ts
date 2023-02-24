import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Diego Fernandes',
    email: 'diego@rocketsaeet.com.br',
  },
})

// ORM - Object Relational Mapper
