import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'

export function gymsRoutes(app: FastifyInstance) {
  app.get('/gyms/search', search)

  // Admin
  app.post('/gyms', create)
}
