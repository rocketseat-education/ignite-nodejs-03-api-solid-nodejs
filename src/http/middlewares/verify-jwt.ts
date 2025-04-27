import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {

    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.status(401).send({ message: 'Token não fornecido.' })
    }

    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}

