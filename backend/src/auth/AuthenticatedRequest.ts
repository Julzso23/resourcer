import { FastifyRequest } from 'fastify'
import { User } from 'entities/user.entity'

export type AuthenticatedRequest = FastifyRequest & { user: User }
