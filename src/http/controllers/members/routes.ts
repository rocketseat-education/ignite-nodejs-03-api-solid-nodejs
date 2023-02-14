import { verifyJWTHook } from '@/http/hooks/verify-jwt-hook'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export function membersRoutes(app: FastifyInstance) {
  app.post('/members', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWTHook] }, profile)
}
