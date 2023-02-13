import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { accountsRoutes } from './controllers/accounts/routes'

export const app = fastify()

app.register(accountsRoutes, {
  prefix: 'accounts',
})

app.register(jwt, {
  secret: 'my-secret',
})
