import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { env } from './env'

import { membersRoutes } from './http/controllers/members/routes'
import { checkInsRoutes } from './http/controllers/checkins/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(membersRoutes)
app.register(checkInsRoutes)
app.register(gymsRoutes)

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.setErrorHandler(function (error, _, reply) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Here we should log to an external service like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
