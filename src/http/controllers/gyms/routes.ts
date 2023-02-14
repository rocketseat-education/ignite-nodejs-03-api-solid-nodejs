import { verifyJWTHook } from '@/http/hooks/verify-jwt-hook'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWTHook)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  // Admin
  app.post('/gyms', create)
}
