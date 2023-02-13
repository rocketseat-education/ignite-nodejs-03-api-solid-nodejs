import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { accountsRoutes } from './controllers/accounts/routes'
import { env } from './env'

export const app = fastify()

app.register(accountsRoutes, {
  prefix: 'accounts',
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})
