import { userRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'

import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookie)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format(),
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error('❌ Unexpected error', error)
    } else {
        // here should we log the error in some service like datadog, sentry, etc
    }

    return reply.status(500).send({
        message: 'Internal server error',
    })
})