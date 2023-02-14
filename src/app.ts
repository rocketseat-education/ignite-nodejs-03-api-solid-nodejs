import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { env } from './env'

import { membersRoutes } from './http/controllers/members/routes'
import { checkInsRoutes } from './http/controllers/checkins/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

app.register(membersRoutes)
app.register(checkInsRoutes)
app.register(gymsRoutes)

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.setErrorHandler(function (error, _, reply) {
  if (env.NODE_ENV === 'dev') {
    console.error(error)
  } else {
    // Here we should log to an external service like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
