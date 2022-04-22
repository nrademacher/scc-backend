import type { QueryResolvers, ResolverContext } from '#internal/types'
import { getUserByEmail, getUserById, getUsersByRole, loginUser } from '../../prisma'
import { coerceToAuthError } from '#internal/utils'
import { AuthenticationError } from 'apollo-server-express'

export const userQueries: QueryResolvers<ResolverContext> = {
    hello: async () => 'Hello!',
    login: async (_parent, { email, password }) => {
        if (!email || !password) {
            throw new AuthenticationError('missing_credentials')
        }

        try {
            return await loginUser(email, password)
        } catch (error) {
            coerceToAuthError(error, 'error_logging_in_user')
        }
    },
    self: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUserById(userId)
    },
    userById: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUserById(id)
    },
    userByEmail: async (_parent, { email }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUserByEmail(email)
    },
    usersByRole: async (_parent, { role }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUsersByRole(role)
    },
}
