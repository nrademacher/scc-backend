import type { UserRoles } from '@prisma/client'
import type { Request } from 'express'
import isJWT from 'validator/lib/isJWT'
import { verify } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { config } from '#internal/lib'

export interface UserResolverContext {
    isAuthed: boolean
    userId?: string
    userRole?: UserRoles
}

export async function createUserContext(request: Request) {
    const userResolverContext: UserResolverContext = {
        isAuthed: false,
    }

    const authHeader: string = request?.headers?.authorization || ''

    if (authHeader) {
        try {
            const [headerPrefix, token] = authHeader.split(' ')

            if (headerPrefix !== 'Bearer' || !isJWT(token)) {
                throw new AuthenticationError('invalid_authentication_header')
            }

            const decoded = verify(token, config.TOKEN_SECRET)

            if (typeof decoded === 'string') return userResolverContext

            if (decoded.userId) {
                userResolverContext.isAuthed = true
                userResolverContext.userId = decoded.userId
                userResolverContext.userRole = decoded.userRole
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'token_validation_failure'

            throw new AuthenticationError(message)
        }
    }

    return userResolverContext
}
