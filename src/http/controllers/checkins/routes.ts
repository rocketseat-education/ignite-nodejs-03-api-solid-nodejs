import { verifyJWTHook } from '@/http/hooks/verify-jwt-hook'
import { FastifyInstance } from 'fastify'
import { checkin } from './checkin'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWTHook)

  app.post('/gyms/:gymId/checkin', checkin)
  app.get('/history', history)
  app.get('/members/:memberId/metrics', metrics)

  // Admin
  app.patch('/checkins/:checkInId/validate', validate)
}
