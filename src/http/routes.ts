import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/authenticate'
import { register } from './controllers/register'
import { profile } from '@/http/controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', profile)
}
