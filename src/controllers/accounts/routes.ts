import { FastifyInstance } from 'fastify'
import { register } from './register'

export function accountsRoutes(app: FastifyInstance) {
  app.post('/', register)
}
