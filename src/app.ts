import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { membersRoutes } from './controllers/members/routes'
import { env } from './env'
import { checkInsRoutes } from './controllers/checkins/routes'
import { gymsRoutes } from './controllers/gyms/routes'

export const app = fastify()

app.register(membersRoutes)
app.register(checkInsRoutes)
app.register(gymsRoutes)

app.register(jwt, {
  secret: env.JWT_SECRET,
})
